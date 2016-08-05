import {
  join
} from 'path';
import _ from 'lodash';
import dedent from 'dedent';
import * as pkg from './package';

const paths = {
  mocha: {
    root: 'test',
    tests: 'test/**/*.js',
    coverage: ['src/server/**/*.js']
  },
  tasks: [
    'gulp/tasks'
  ],
  eslint: {
    source: [
      'gulpfile.babel.js',
      'gulp.config.js',
      'gulp/**/*.js',
      'test/**/*.js',
      'src/server/**/*.js',
      'src/assets/scripts/**/*.js'
    ]
  },
  assets: {
    scripts: {
      source: 'src/assets/scripts/**/*.js',
      target: 'dist/public/js'
    },
    styles: {
      watchable: 'src/assets/styles/**/*.scss',
      source: 'src/assets/styles/main.scss',
      target: 'dist/public/css'
    },
    static: {
      source: 'src/assets/static/**/*',
      target: 'dist/public'
    },
    jade: {
      source: 'src/assets/jade/**/*.jade',
      target: 'dist'
    },
    server: {
      source: 'src/server/**/*.js',
      target: 'dist',
      includes: {
        target: 'dist/includes'
      }
    },
    favicon: {
      source: ['src/assets/img/favicon.png'],
      target: 'dist/public/favicons',
      inject: {
        target: ['src/assets/jade/**/*.jade']
      }
    },
    modernizr: {
      source: ['src/assets/scripts/**/*.js', 'src/assets/styles/**/*.scss'],
      target: 'dist/public/js'
    }
  },
  dependencies: {
    normalize: {
      source: 'node_modules/normalize.css/normalize.css',
      target: 'dist/vendor/normalize'
    }
  },
  server: {
    cwd: 'dist'
  },
  browserSync: {
    server: 'src/server/**/*',
    assets: 'src/assets/**/*'
  }
};

const config = {
  browserSync: {
    config: {
      proxy: 'localhost:8000'
    }
  },
  concatenadedFileName: 'all',
  headers: {
    full: dedent `
      /*!
       * <%= pkg.name %> - <%= pkg.description %>
       * @version v<%= pkg.version %>
       * @link <%= pkg.homepage %>
       * @license <%= pkg.license %>
      */
    `,
    short: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %> */'
  },
  faviconsOptions: {
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
  },
  modernizrOptions: {}
};

{
  const {
    deepMapValues
  } = _.mixin(require('lodash-deep'));
  config.paths = deepMapValues(paths, (value) => join(__dirname, value));
  config.package = pkg;
  config.env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';
}

export const get = (...keys) => {
  if (keys.length === 1) {
    return _.get(config, keys[0]);
  }

  const obj = {};
  keys.map((key) => {
    obj[key.match(/\.{0,1}([\w-_]+)$/)[1]] = get(key);
  });
  return obj;
};
