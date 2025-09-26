import chokidar from 'chokidar'
import { exec } from 'child_process'

const watcher = chokidar.watch('content/blog', {
  ignored: /node_modules|\.git/,
  persistent: true
});

watcher.on('add', path => {
  console.log(`File ${path} has been added`);
  exec('node scripts/update-dashboard.mjs', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
});
