import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import * as config from './gulp.config';
import TaskLoader from './gulp/lib/TaskLoader';
import runSequence from 'run-sequence';
import rimraf from 'rimraf';

const browserSync = BrowserSync.create();

{
  gulp.config = config;
  gulp.browserSync = browserSync;
  const loader = new TaskLoader(gulp);
  loader.loadDir(...gulp.config.get('paths.tasks'));
}

gulp.task('default', done => done());

gulp.task('browser-sync', () => {
  browserSync.init(gulp.config.get('browserSync.config'));
});

gulp.task('clean:dist', done => rimraf(gulp.config.get('paths.root.dist'), done));

gulp.task('build', done => runSequence(['assets', 'dependencies', 'server:build'], done));

gulp.task('dev', done => runSequence('build', ['server:start', 'browser-sync'], () => {

  const paths = gulp.config.get('paths.assets');

  gulp.watch(paths.server.source, () => runSequence('server:build', 'server:restart', browserSync.reload));
  gulp.watch(paths.scripts.source, () => runSequence('assets:scripts', browserSync.reload));
  gulp.watch(paths.styles.watchable, ['assets:styles']);
  gulp.watch(paths.jade.source, () => runSequence('assets:jade', 'server:restart', browserSync.reload));
  gulp.watch(paths.static.source, () => runSequence('assets:static', browserSync.reload));
  done();

}));
