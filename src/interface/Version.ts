import { Technology } from './Technology';

export interface Version {
  id?: string;
  version?: string;
  publicationDate?: Date;
  technologyId?: string;
  technology?: Technology;
}
