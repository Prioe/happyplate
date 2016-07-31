import {
  join
} from 'path';
import _ from 'lodash';
import dedent from 'dedent';

const paths = {
  mocha: {
    root: 'test',
    tests: 'test/*.js',
    coverage: ['src/assets/scripts/**/*.js', 'src/server/**/*.js']
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
      source: 'src/assets/scripts/**/*',
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
      source: 'src/assets/jade/**/*',
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
      source: 'src/assets/img/favicon.jpg',
      target: 'dist/public/favicons'
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
  }
};

{
  const {
    deepMapValues
  } = _.mixin(require('lodash-deep'));
  config.paths = deepMapValues(paths, (value) => join(__dirname, value));
  config.package = require('./package');
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
