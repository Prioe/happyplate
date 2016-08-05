import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import env from 'gulp-env';
import pump from 'pump';
import { Instrumenter } from 'isparta';

export default function(gulp) {

  const paths = gulp.config.get('paths.mocha');

  gulp.task('pre-test', ['assets'], done => {
    pump([
      gulp.src(paths.coverage),
      istanbul({
        // supports es6
        instrumenter: Instrumenter
      }),
      istanbul.hookRequire()
    ], done);
  });

  gulp.task('mocha', ['pre-test'], done => {

    const envs = env.set({ NODE_ENV: 'testing' });

    pump([
      envs,
      gulp.src(paths.tests, { read: false }),
      mocha({ reporter: 'spec' }),
      istanbul.writeReports({ dir: './dist/public/coverage' }),
      envs.reset
    ], done);

  });
}
