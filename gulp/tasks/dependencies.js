import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import pump from 'pump';

export default function(gulp) {

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
}
