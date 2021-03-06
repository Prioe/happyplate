import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import modernizr from 'gulp-modernizr';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import filter from 'gulp-filter';
import html2jade from 'gulp-html2jade';
import inject from 'gulp-inject';
import pump from 'pump';
import { use } from 'run-sequence';
import favicons from 'gulp-favicons';

export default function(gulp) {

  const paths = gulp.config.get('paths.assets');
  const runSequence = use(gulp);

  gulp.task('assets:pug', done => {
    pump([
      gulp.src(paths.pug.source),
      gulp.dest(paths.pug.target)
    ], done);
  });

  gulp.task('assets:static', done => {
    pump([
      gulp.src(paths.static.source),
      gulp.dest(paths.static.target)
    ], done);
  });

  gulp.task('assets:scripts', done => {

    const concatFilter =
      filter(['**/*', '!**/polyfills.js'], { restore: true });

    pump([
      gulp.src(paths.scripts.source),
      concatFilter,
      concat(`${gulp.config.get('concatenadedFileName')}.js`),
      concatFilter.restore,
      babel(),
      sourcemaps.init(),
      uglify(),
      header(gulp.config.get('headers.short'), {
        pkg: gulp.config.get('package')
      }),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.scripts.target)
    ], done);
  });

  gulp.task('assets:modernizr', done => {
    pump([
      gulp.src(paths.modernizr.source),
      modernizr(gulp.config.get('modernizrOptions')),
      sourcemaps.init(),
      uglify(),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.modernizr.target)
    ], done);
  });

  gulp.task('assets:styles', done => {
    pump([
      gulp.src(paths.styles.source),
      sourcemaps.init(),
      sass().on('error', sass.logError),
      autoprefixer(),
      cleanCSS(),
      rename({
        basename: gulp.config.get('concatenadedFileName'),
        suffix: '.min'
      }),
      sourcemaps.write('.'),
      gulp.dest(paths.styles.target),
      gulp.browserSync.stream()
    ], done);
  });

  gulp.task('assets:favicon', done => {

    const htmlFilter = filter('*.html');
    const iconsFilter = filter(['*', '!*.html'], { restore: true });

    const source = pump([
      gulp.src(paths.favicon.source),
      favicons(gulp.config.get('faviconsOptions')),
      iconsFilter,
      gulp.dest(paths.favicon.target),
      iconsFilter.restore,
      htmlFilter,
      html2jade({ bodyless: true }),
      rename({ extname: '.pug' }),
      gulp.dest(paths.server.includes.target)
    ], done);

    pump([
      gulp.src(paths.favicon.inject.target),
      inject(source, {
        relative: false,
        ignorePath: 'dist',
        addPrefix: '..',
        addRootSlash: false,
        name: 'favicon'
      }),
      gulp.dest(paths.pug.target)
    ]);
  });

  gulp.task('assets', done => {
    const tasks = [[
      'assets:pug',
      'assets:static',
      'assets:scripts',
      'assets:modernizr',
      'assets:styles'
    ]];
    if (gulp.config.get('env') === 'production') {
      tasks.push('assets:favicon');
    }
    runSequence(...tasks, done);
  });

}
