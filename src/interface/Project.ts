import { Environment } from './Environment';

export interface Project {
  id?: string;
  name: string;
  description?: string;
  logo?: string;
  environments: Array<Environment>;
}


/* export class Projects implements Project {
  public name: string = "";

  public get Name() {
      return this.name;
  }

  public set Name(value) {
      this.name = value;
  }
} */
