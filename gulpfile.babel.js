import gulp from 'gulp';
import * as config from './gulp.config';
import pkg from './package'

{
  const merge = Object.assign(pkg, config);
  gulp.config = merge;
}

gulp.task('default', () => console.log(gulp));
