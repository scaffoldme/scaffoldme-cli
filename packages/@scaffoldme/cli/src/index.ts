import { Project } from '@scaffoldme/core';
import { PROJECT_FILE } from '@scaffoldme/utils';
const jsonfile = require('jsonfile');

export * from "./actions";
export * from "./input";
export * from "./lib";
export * from "./loader";
export * from "../boxen"

// let projectJson: Project | undefined;
// export let project: Project | undefined = projectJson;

export const loadScaffoldmeJson = async () => {
  const projectJson: Project = await jsonfile.readFile(PROJECT_FILE);
  return projectJson;
};
