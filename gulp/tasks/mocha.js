import mocha from 'gulp-mocha';

export default function(gulp) {
  gulp.task('mocha', () => {
    return gulp.src(gulp.config.paths.mocha.tests, {
      read: false
    })
      // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'spec'
    }));
  });
}
