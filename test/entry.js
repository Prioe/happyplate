import { sync } from 'walkdir';
import path from 'path';

const tree = {};

sync(__dirname, walkedPath => {
  if (path.extname(walkedPath) === '.js' && !(walkedPath === __filename)) {
    let pos = tree;
    path.relative(__dirname, walkedPath).split(path.sep).map((reg) => {
      if (path.extname(reg) !== '.js') {
        pos[reg] = pos[reg] || {};
        pos = pos[reg];
      }
      else {
        pos[path.basename(reg, '.js')] = walkedPath;
      }
    });
  }
});

const map = obj => Object.keys(obj).map(value => {
  if (typeof obj[value] === 'object') {
    describe(value, () =>{
      map(obj[value]);
    });
  }
  else {
    require(obj[value]);
  }
});

map(tree);
