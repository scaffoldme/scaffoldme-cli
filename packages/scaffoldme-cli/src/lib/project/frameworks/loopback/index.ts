import { Framework } from '..';
import { ProjectDeps } from '../..';
import { DEFAULT_PORT_LOOPBACK } from '../../../../constants';
import { IVersion, TechnologyName } from '../../../../definitions';

export class LoopbackFramework extends Framework {
  readonly name: TechnologyName = 'loopback';
  readonly port: number;

  constructor(deps: ProjectDeps, selectedVersion: IVersion, port: number) {
    super(selectedVersion, deps);
    this.port = port ? DEFAULT_PORT_LOOPBACK : port;
  }

  async install(environmentName: string): Promise<void> {
    await this.deps.shell.run('git', ['clone', `https://github.com/scaffoldme/${this.name}-starter.git`, '--progress', environmentName], { stdio: 'inherit' });
  }
}
