
export type EnvironmentType = 'frontEnd' | 'api' | 'service' | 'mobile' | 'dataBase';

export interface IEnvironment {
  id?: string;
  name: string;
  description?: string;
  environmentType: EnvironmentType;
  framework: ITechnology;
  style: ITechnology;
  typing?: ITechnology;
  modules?: ITechnology[];
}

export interface IVersion {
  id?: string;
  version?: string;
  publicationDate?: Date;
  technologyId?: string;
  technology?: ITechnology;
}

export type TechnologyType = 'framework' | 'style' | 'typing' | 'module';

export type TechnologyName = 'react' | 'angular' | 'vueJs' | 'express' | 'loopback';

export interface ITechnology {
  id?: string;
  name: TechnologyName;
  logo?: string;
  availableVersions?: IVersion[];
  selectedVersion?: IVersion;
  publicationDate?: Date;
  technologyType?: TechnologyType;
  compatibleWith?: string[];
  environments?: IEnvironment[];
}

export interface IProject {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  environments?: IEnvironment[];
}
