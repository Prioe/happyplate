import gutil from 'gulp-util';
import cp from 'child_process';

const { PluginError, noop } = gutil;

export function spawn(args) {

  const callback = args.callback || noop;
  const niceCommand = args.command.split(/\./)[0];
  const log = (msg, color) => gutil.log(`[${gutil.colors[color](niceCommand)}] ${msg}`);
  const proc = cp.spawn(args.command, args.args, args.opts);

  let error;

  proc.stdout.on('data', (data) => {
    const msgs = data.toString('utf8').trim().split(/\r?\n/g);
    return msgs.filter((msg) => msg !== '').map((msg) => log(msg, 'green'));
  });

  proc.stderr.on('data', (data) => {
    const msgs = data.toString('utf8').split(/\r?\n/g);
    return msgs.filter((msg) => msg !== '').map((msg) => log(msg, 'red'));
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      return callback(
        new PluginError(niceCommand, `${niceCommand} ended with code ${code}${error ? ` (${error.code})` : ''}`)
      );
    }
    return callback();
  });

  proc.on('error', err => {
    error = err;
  });

  return proc;
}
