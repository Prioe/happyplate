import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import insert from 'gulp-insert';
import pump from 'pump';
import { use } from 'run-sequence';

export default function(gulp) {

  const runSequence = use(gulp);
  const paths = gulp.config.get('paths.dependencies');

  gulp.task('dependencies:normalize', done => {
    pump([
      gulp.src(paths.normalize.source),
      sourcemaps.init(),
      cleanCSS(),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.normalize.target)
    ], done);
  });

  gulp.task('dependencies:rem-unit-polyfill', done => {
    pump([
      gulp.src(paths.remUnitPolyfill.source),
      sourcemaps.init(),
      uglify(),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.remUnitPolyfill.target)
    ], done);
  });

  gulp.task('dependencies:jquery', done => {
    const jsFilter = filter('**/*.js', { restore: true });
    pump([
      gulp.src(paths.jquery.source),
      jsFilter,
      insert.append('/*# sourceMappingURL=jquery.min.map */'),
      jsFilter.restore,
      gulp.dest(paths.jquery.target)
    ], done);
  });

  gulp.task('dependencies', done => runSequence([
    'dependencies:normalize',
    'dependencies:rem-unit-polyfill',
    'dependencies:jquery'
  ], done));

}
