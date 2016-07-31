import eslint from 'gulp-eslint';

export default function(gulp) {

  const paths = gulp.config.get('paths.eslint');

  gulp.task('lint', () => {
    return gulp.src(paths.source)
      .pipe(eslint())
      .pipe(eslint.format('stylish'))
      .pipe(eslint.failAfterError());
  });
}
