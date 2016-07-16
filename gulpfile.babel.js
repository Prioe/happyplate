import gulp from 'gulp';
import * as config from './gulp.config';
import pkg from './package';
import TaskLoader from './gulp/lib/TaskLoader';

{
  gulp.config = Object.assign(pkg, config);
  const loader = new TaskLoader(gulp, __dirname);
  loader.loadDir(...gulp.config.paths.tasks);
}

gulp.task('default', done => done);
