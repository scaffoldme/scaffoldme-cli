import { Version } from './Version';
import { Environment } from './Environment';

export enum TechnologyType {
  Framework = "framework",
  Style = "style",
  Typing = "typing",
  Module = "module"
}

export enum TechnologyName {
  React = "React",
  Angular = "Angular",
  VueJs = "VueJs"
}

export interface Technology {
  id?: string;
  name: TechnologyName;
  logo?: string;
  availableVersions?: Array<Version>;
  selectedVersion?: Version;
  publicationDate?: Date;
  technologyType?: TechnologyType;
  compatibleWith?: Array<string>;
  environments?: Array<Environment>;
}
