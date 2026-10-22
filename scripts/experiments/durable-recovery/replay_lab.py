"""Offline teaching experiment. Not Vercel durable-harness or a production engine."""
import argparse, json, os, sqlite3
from pathlib import Path

def connect(path):
    db=sqlite3.connect(path)
    db.execute('PRAGMA synchronous=FULL')
    db.execute('CREATE TABLE IF NOT EXISTS calls (id TEXT PRIMARY KEY, policy TEXT, state TEXT, result TEXT)')
    db.commit()
    return db

def effect(root, call):
    db=sqlite3.connect(root/'external.sqlite')
    db.execute('CREATE TABLE IF NOT EXISTS effects (call TEXT)')
    db.execute('INSERT INTO effects VALUES (?)',(call,)); db.commit(); db.close()
    return 'result:'+call

def run(root, fail=None):
    root.mkdir(parents=True,exist_ok=True); db=connect(root/'log.sqlite')
    trace=[]
    for call,policy in [('model','never'),('read','safe'),('publish','never')]:
        row=db.execute('SELECT state,result FROM calls WHERE id=?',(call,)).fetchone()
        if row and row[0]=='done': trace.append([call,'cached']); continue
        if row and row[0]=='started' and policy=='never':
            trace.append([call,'uncertain']); print(json.dumps(trace)); return 3
        db.execute('INSERT OR REPLACE INTO calls VALUES (?,?,?,NULL)',(call,policy,'started')); db.commit()
        result=effect(root,call)
        if fail==call+'_after_effect': os._exit(17)
        db.execute('UPDATE calls SET state=?, result=? WHERE id=?',('done',result,call)); db.commit()
        if fail==call+'_after_outcome': os._exit(17)
        trace.append([call,'executed'])
    print(json.dumps(trace)); return 0

def reconcile(root,call):
    ext=sqlite3.connect(root/'external.sqlite')
    count=ext.execute('SELECT count(*) FROM effects WHERE call=?',(call,)).fetchone()[0]
    if count!=1: raise RuntimeError('External outcome is not uniquely confirmed')
    db=connect(root/'log.sqlite')
    db.execute('UPDATE calls SET state=?, result=? WHERE id=?',('done','result:'+call,call)); db.commit()

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('root',type=Path); p.add_argument('--fail'); p.add_argument('--reconcile')
    a=p.parse_args()
    if a.reconcile: reconcile(a.root,a.reconcile)
    else: raise SystemExit(run(a.root,a.fail))
