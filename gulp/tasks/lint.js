import eslint from 'gulp-eslint';

export default function(gulp) {
  gulp.task('lint', () => {
    return gulp.src(gulp.config.paths.eslint.files)
      .pipe(eslint())
      .pipe(eslint.format('stylish'))
      .pipe(eslint.failAfterError());
  });
}
