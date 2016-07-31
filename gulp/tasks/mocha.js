import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';

export default function(gulp) {

  const paths = gulp.config.get('paths.mocha');
  console.log(paths.coverage);

  gulp.task('pre-test', () => {
    return gulp.src(paths.coverage)
      // Covering files
      .pipe(istanbul({
        // supports es6
        instrumenter: Instrumenter
      }))
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire());
  });

  gulp.task('mocha', ['pre-test'], () => {
    return gulp.src(paths.tests, {
      read: false
    })
      // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(istanbul.writeReports());
  });
}
