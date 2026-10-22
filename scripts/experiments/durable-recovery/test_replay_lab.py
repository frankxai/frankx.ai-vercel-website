import json, sqlite3, subprocess, sys, tempfile, unittest
from pathlib import Path
SCRIPT=Path(__file__).with_name('replay_lab.py')
RECEIPT=[]
class ReplayTests(unittest.TestCase):
    def invoke(self,root,*args):
        p=subprocess.run([sys.executable,str(SCRIPT),str(root),*args],capture_output=True,text=True)
        return p.returncode, json.loads(p.stdout) if p.stdout.strip() else []
    def counts(self,root):
        db=sqlite3.connect(root/'external.sqlite')
        return dict(db.execute('SELECT call,count(*) FROM effects GROUP BY call'))
    def test_completed_result_is_reused(self):
        with tempfile.TemporaryDirectory() as d:
            r=Path(d); self.assertEqual(self.invoke(r,'--fail','model_after_outcome')[0],17)
            code,trace=self.invoke(r); self.assertEqual(code,0)
            self.assertIn(['model','cached'],trace); self.assertEqual(self.counts(r)['model'],1)
            RECEIPT.append({'scenario':'completed model outcome, abrupt exit, restart','execution_counts':self.counts(r),'trace':trace})
    def test_safe_interrupted_read_is_retried(self):
        with tempfile.TemporaryDirectory() as d:
            r=Path(d); self.assertEqual(self.invoke(r,'--fail','read_after_effect')[0],17)
            code,trace=self.invoke(r); self.assertEqual(code,0)
            self.assertEqual(self.counts(r)['read'],2); self.assertEqual(self.counts(r)['model'],1)
            RECEIPT.append({'scenario':'read completed externally before log outcome, restart','execution_counts':self.counts(r),'trace':trace})
    def test_uncertain_publish_requires_reconciliation(self):
        with tempfile.TemporaryDirectory() as d:
            r=Path(d); self.assertEqual(self.invoke(r,'--fail','publish_after_effect')[0],17)
            code,trace=self.invoke(r); self.assertEqual(code,3); self.assertIn(['publish','uncertain'],trace)
            self.assertEqual(self.counts(r)['publish'],1)
            self.assertEqual(self.invoke(r,'--reconcile','publish')[0],0)
            self.assertEqual(self.invoke(r)[0],0); self.assertEqual(self.counts(r)['publish'],1)
            RECEIPT.append({'scenario':'publish effect before outcome, refuse replay, reconcile, restart','execution_counts':self.counts(r),'trace_before_reconciliation':trace})

if __name__=='__main__':
    suite=unittest.defaultTestLoader.loadTestsFromTestCase(ReplayTests)
    result=unittest.TextTestRunner(verbosity=2).run(suite)
    Path(__file__).with_name('experiment-receipt.json').write_text(json.dumps({'implementation':'offline Python SQLite teaching model; no model API, no Vercel package or cloud deployment','cases':RECEIPT,'tests_run':result.testsRun,'failures':len(result.failures),'errors':len(result.errors)},indent=2)+'\n')
    raise SystemExit(not result.wasSuccessful())
