import { Environment } from './Environment';

interface Project {
  id?: string;
  name?: string;
  description?: string;
  logo?: string;
  environments?: Array<Environment>;
}
