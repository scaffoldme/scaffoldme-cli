import { Technology } from './Technology';

enum EnvironmentType {
  FrontEnd = "frontend",
  Api = "api",
  Service = "service",
  Mobile = "mobile",
  DataBase = "database"
}

export interface Environment {
  id?: string;
  name?: string;
  description?: string;
  environmentType: EnvironmentType;
  framework?: Technology;
  style?: Technology;
  typing?: Technology;
  modules?: Array<Technology>;
}
