import gulp from 'gulp';
import BrowserSync from 'browser-sync';
import TaskLoader from './gulp/lib/TaskLoader';
import runSequence from 'run-sequence';
import rimraf from 'rimraf';
import { PluginError } from 'gulp-util';

const browserSync = BrowserSync.create();

let config;

{
  gulp.config = require('./gulp.config');
  gulp.browserSync = browserSync;
  const loader = new TaskLoader(gulp);
  config = gulp.config.get(
    'paths.tasks',
    'paths.assets',
    'paths.root.dist',
    'browserSync',
    'env'
  );
  loader.loadDir(...config.tasks);
}

gulp.task('default', done => {
  if (config.env === 'production') {
    return done(new PluginError(
      'default-task',
      'This is a development task, don\'t use it while running in production'
    ));
  }
  return done();
});

gulp.task('browser-sync', () => {
  browserSync.init(config.browserSync.config);
});

gulp.task('clean:dist', done =>
  rimraf(config.dist, done)
);

gulp.task('build', done =>
  runSequence(['assets', 'dependencies', 'server:build'], done)
);

gulp.task('dev', done =>
  runSequence('build', ['server:start', 'browser-sync'], () => {

    const assets = config.assets;

    gulp.watch(assets.styles.watchable, ['assets:styles']);

    gulp.watch(assets.server.source, () =>
      runSequence('server:build', 'server:restart', browserSync.reload)
    );

    gulp.watch(assets.scripts.source, () =>
      runSequence('assets:scripts', browserSync.reload)
    );

    gulp.watch(assets.jade.source, () =>
      runSequence('assets:jade', 'server:restart', browserSync.reload)
    );

    gulp.watch(assets.static.source, () =>
      runSequence('assets:static', browserSync.reload)
    );

    done();
  })
);
