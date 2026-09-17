import argparse, json, urllib.request, urllib.error, hashlib, subprocess, tempfile, os, sys
from pathlib import Path
from datetime import datetime, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed
parser=argparse.ArgumentParser(description='Verify existing owned public music exports. Requires ffprobe and ffmpeg; downloads each object temporarily.')
parser.add_argument('--output', required=True, type=Path, help='Output playback manifest path')
args=parser.parse_args()
root=Path(__file__).resolve().parent.parent
rows=json.loads((root/'data/music-asset-registry.json').read_text())['tracks']
checked=datetime.now(timezone.utc).isoformat()
def verify(t):
 url=t['assetRefs']['audioUrl']
 if t['status']!='published' or not url.startswith('https://vbmwpibfe0yzx3fd.public.blob.vercel-storage.com/music/'):return {'sunoId':t['sunoId'],'error':'not eligible'}
 path=None
 try:
  req=urllib.request.Request(url,headers={'Range':'bytes=0-1023'})
  with urllib.request.urlopen(req,timeout=20) as r:
   range_status=r.status
   content_range=r.headers.get('Content-Range','')
   sample=r.read(1024)
  if range_status!=206 or not content_range.startswith('bytes 0-1023/'):raise ValueError('range check failed')
  with urllib.request.urlopen(url,timeout=30) as r, tempfile.NamedTemporaryFile(suffix='.mp3',delete=False) as f:
   path=f.name
   if r.headers.get_content_type()!='audio/mpeg':raise ValueError('not audio/mpeg')
   h=hashlib.sha256();size=0
   while True:
    data=r.read(1024*1024)
    if not data:break
    size+=len(data)
    if size>30*1024*1024:raise ValueError('oversize')
    h.update(data);f.write(data)
  probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','a:0','-show_entries','stream=codec_name,sample_rate,channels:format=duration','-of','json',path],timeout=15))
  subprocess.run(['ffmpeg','-nostdin','-v','error','-xerror','-i',path,'-f','null','-'],check=True,timeout=30,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
  stream=probe['streams'][0];duration=float(probe['format']['duration'])
  if stream['codec_name']!='mp3' or duration<1:raise ValueError('invalid audio stream')
  return {'sunoId':t['sunoId'],'title':t['title'],'audioUrl':url,'sha256':h.hexdigest(),'bytes':size,'durationSeconds':round(duration,3),'codec':stream['codec_name'],'sampleRate':int(stream['sample_rate']),'channels':stream['channels'],'rangeVerified':True,'decodeVerified':True,'verifiedAt':checked}
 except Exception as e:return {'sunoId':t['sunoId'],'title':t['title'],'error':str(e)[:250]}
 finally:
  if path:os.unlink(path)
results=[]
with ThreadPoolExecutor(max_workers=5) as pool:
 for f in as_completed([pool.submit(verify,t) for t in rows]):
  r=f.result();results.append(r)
  print(json.dumps({'title':r.get('title'),'ok':'error' not in r,'error':r.get('error')}),flush=True)
passed=sorted([r for r in results if 'error' not in r], key=lambda r:r['sunoId'])
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps({'schema':'frankx-music-playback-sources/1','checkedAt':checked,'verification':'Owned published MP3 exports: full SHA-256, ffprobe/ffmpeg decode, HTTP byte-range checks. No new rights grant.','tracks':passed},indent=2)+'\n')
print('VERIFIED',sum('error' not in r for r in results),'OF',len(results),flush=True)
sys.exit(1 if any('error' in r for r in results) else 0)
