import { readdirSync } from 'fs';
import { join } from 'path';

class TaskLoader {

  constructor(gulp) {
    this.gulp = gulp;
  }

  loadDir(...paths) {
    for (const path of paths) {
      const tasks = readdirSync(path);
      for (const task of tasks) {
        this.load(join(path, task));
      }
    }
  }

  load(file) {
    require(file).default(this.gulp);
  }

}

export { TaskLoader as default };
