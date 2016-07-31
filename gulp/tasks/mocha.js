import mocha from 'gulp-mocha';

export default function(gulp) {

  const paths = gulp.config.get('paths.mocha');

  gulp.task('mocha', () => {
    return gulp.src(paths.tests, {
      read: false
    })
      // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'spec'
    }));
  });
}
