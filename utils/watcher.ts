const shell = require('shelljs');
import * as chalk from "chalk";

const silent = 'false';

export const watcher = (label: string, cmd: string = '', withSuccess = true) => {
  if (label.length > 0) {
    //shell.echo(label);
    console.log(chalk.default.yellowBright(label));
  }
  if (cmd.length > 0) {
    const data = shell.exec(cmd, {
      silent,
    });

    if (data.stderr && data.code !== 0) {
      console.error(data.stderr);
      process.exit(1);
    }
  }

  if (label.length > 0 && withSuccess) {
    //shell.echo('✅  Success');
    console.log(chalk.default.greenBright('✅  Success'));
    shell.echo('');
  }

};

export const asyncWatcher = (label:string, cmd:string, withSuccess = true, resolve:any) => {
  if (label.length > 0) {
    shell.echo(label);
  }

  return shell.exec(cmd, { silent, async: true }, (code:any, stdout:any, stderr:any) => {
    if (stderr && code !== 0) {
      console.error(stderr);
      process.exit(1);
    }

    return resolve();
  });
};

