"""Check an actual delivered ZIP, its contents and hashes without running its code."""
from pathlib import Path
import hashlib, json, sys, tempfile, zipfile
archive = Path(sys.argv[1])
with tempfile.TemporaryDirectory() as tmp:
    with zipfile.ZipFile(archive) as package:
        assert package.testzip() is None, 'ZIP CRC failure'
        names = package.namelist()
        assert len(set(names)) == len(names), 'Duplicate entry'
        assert all(not n.startswith('/') and '..' not in Path(n).parts for n in names), 'Unsafe path'
        package.extractall(tmp)
    roots = list(Path(tmp).iterdir())
    assert len(roots) == 1 and roots[0].is_dir(), 'Expected one package folder'
    root = roots[0]
    listed = set()
    for line in (root / 'SHA256SUMS.txt').read_text().splitlines():
        expected, name = line.split('  ', 1)
        assert hashlib.sha256((root / name).read_bytes()).hexdigest() == expected, name
        listed.add(name)
    actual = {p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file()}
    assert actual == listed | {'SHA256SUMS.txt'}, 'Unhashed or missing file'
    assert len(list((root / 'roles').glob('*.md'))) == 5
    assert len(list((root / 'examples').glob('*.md'))) == 3
    assert (root / 'START-HERE.html').stat().st_size > 50000
    print(json.dumps({'passed': True, 'files': len(actual), 'bytes': archive.stat().st_size,
                      'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}))
