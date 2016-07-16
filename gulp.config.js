import { join } from 'path';

const absolutize = (...dirs) => join(__dirname, ...dirs);

export const paths = {
  source: absolutize('src'),
  destination: absolutize('dist'),
  mocha: {
    root: absolutize('test'),
    tests: absolutize('test', '*.js')
  },
  tasks: [
    absolutize('gulp/tasks')
  ],
  eslint: {
    files: [
      absolutize('gulpfile.babel.js'),
      absolutize('gulp.config.js'),
      absolutize('gulp/**/*'),
      absolutize('test/**/*')
    ]
  }
};
