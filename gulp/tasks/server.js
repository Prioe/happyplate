import { spawn } from '../lib/util';
import { use } from 'run-sequence';
import babel from 'gulp-babel';

export default function(gulp) {

  const runSequence = use(gulp);
  const paths = gulp.config.get('paths.assets', 'paths.server');

  let serverProcess;

  gulp.task('server:build', ['lint'], () => {
    return gulp.src(paths.assets.server.source)
      .pipe(babel())
      .pipe(gulp.dest(paths.assets.server.target));
  });

  gulp.task('server:start', () => {
    serverProcess = spawn({
      command: 'node',
      args: ['server.js'],
      opts: {
        cwd: paths.server.cwd
      }
    });
  });

  gulp.task('server:kill', () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill('SIGINT');
    }
    return void 0;
  });

  gulp.task('server:restart', done => runSequence('server:kill', 'server:start', done));
}
