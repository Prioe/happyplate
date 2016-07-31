import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import * as config from './gulp.config';
import TaskLoader from './gulp/lib/TaskLoader';
import runSequence from 'run-sequence';

const browserSync = BrowserSync.create();

{
  gulp.config = config;
  const loader = new TaskLoader(gulp, __dirname);
  loader.loadDir(...gulp.config.get('paths.tasks'));
}

gulp.task('default', done => done());

gulp.task('browser-sync', () => {
  browserSync.init(gulp.config.get('browserSync.config'));
});

gulp.task('dev', done => runSequence('server:build', ['server:start', 'browser-sync'], () => {
  gulp.watch(gulp.config.get('paths.browserSync.server'),
    () => runSequence('server:build', 'server:restart', browserSync.reload));
  done();
}));
