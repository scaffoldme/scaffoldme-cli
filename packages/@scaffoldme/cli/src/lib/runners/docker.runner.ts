import Listr from "listr";
const execa = require("execa");

export class DockerRunner {
  constructor() {}

  async startContainer(container_name: string): Promise<void> {
    new Listr([
      {
        title: `Start docker container ${container_name}`,
        task: () => execa.shell(`docker start ${container_name}`),
      },
    ]).run();
  }

  async stopContainer(container_name: string): Promise<void> {
    new Listr([
      {
        title: `Stop docker container ${container_name}`,
        task: () => execa.shell(`docker stop ${container_name}`),
      },
    ]).run();
  }
}
