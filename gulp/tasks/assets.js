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
import pump from 'pump';
import { use } from 'run-sequence';
import favicons from 'gulp-favicons';

export default function(gulp) {

  const paths = gulp.config.get('paths.assets');
  const pkg = gulp.config.get('package');
  const runSequence = use(gulp);

  gulp.task('assets:jade', () => {
    return gulp.src(paths.jade.source)
      .pipe(gulp.dest(paths.jade.target));
  });

  gulp.task('assets:static', () => {
    return gulp.src(paths.static.source)
      .pipe(gulp.dest(paths.static.target));
  });

  gulp.task('assets:scripts', done => {
    pump([
      gulp.src(paths.scripts.source),
      concat(`${gulp.config.get('concatenadedFileName')}.js`),
      babel(),
      sourcemaps.init(),
      uglify(),
      header(gulp.config.get('headers.short'), { pkg: gulp.config.get('package') }),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.scripts.target)
    ], done);
  });

  gulp.task('assets:modernizr', done => {
    pump([
      gulp.src(paths.scripts.source),
      modernizr(),
      sourcemaps.init(),
      uglify(),
      rename({ suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.scripts.target)
    ], done);
  });

  gulp.task('assets:styles', done => {
    pump([
      gulp.src(paths.styles.source),
      sourcemaps.init(),
      sass().on('error', sass.logError),
      autoprefixer(),
      cleanCSS(),
      rename({ basename: gulp.config.get('concatenadedFileName'), suffix: '.min' }),
      sourcemaps.write('.'),
      gulp.dest(paths.styles.target),
      gulp.browserSync.stream()
    ], done);
  });

  gulp.task('assets:favicon', done => {

    const htmlFilter = filter('*.html');
    const iconsFilter = filter(['*', '!*.html'], { restore: true });

    pump([
      gulp.src(paths.favicon.source),
      favicons({
        appName: pkg.name,
        appDescription: pkg.description,
        developerName: pkg.author.name,
        developerURL: pkg.author.url,
        background: '#020307',
        path: '/favicons/',
        url: pkg.url,
        display: 'standalone',
        orientation: 'portrait',
        version: pkg.version,
        logging: true,
        online: false,
        html: 'favicons.html',
        pipeHTML: true,
        replace: true
      }),
      iconsFilter,
      gulp.dest(paths.favicon.target),
      iconsFilter.restore,
      htmlFilter,
      html2jade({ bodyless: true }),
      gulp.dest(paths.server.includes.target)
    ], done);
  });

  gulp.task('assets', done => runSequence([
    'assets:jade',
    'assets:static',
    'assets:scripts',
    'assets:modernizr',
    'assets:styles'
  ], done));

}
