import { MESSAGES } from "@scaffoldme/utils";
import chalk from "chalk";
import { ChildProcess, spawn, SpawnOptions } from "child_process";

export class AbstractRunner {
  constructor(protected binary: string) {}

  public async run(
    command: string,
    collect = false,
    cwd: string = process.cwd()
  ): Promise<null | string> {
    console.log("COMMAND IN ABSTRACT RUNNER", command);

    const args: string[] = [command];
    const options: SpawnOptions = {
      cwd,
      stdio: collect ? "pipe" : "inherit",
      shell: true
    };
    return new Promise<null | string>((resolve, reject) => {
      const child: ChildProcess = spawn(`${this.binary}`, args, options);
      console.log("CHILDDD .. ,", child);
      if (collect) {
        console.log("COLLECTE..", collect);

        child.stdout!.on("data", data =>
          resolve(data.toString().replace(/\r\n|\n/, ""))
        );
      }
      child.on("close", code => {
        if (code === 0) {
          resolve(null);
        } else {
          console.error(
            chalk.red(
              MESSAGES.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)
            )
          );
          reject();
        }
      });
    });
  }
}
