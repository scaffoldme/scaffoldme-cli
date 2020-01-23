import { Project } from "@scaffoldme/core";
import { PROJECT_FILE } from "@scaffoldme/utils";
const jsonfile = require("jsonfile");

export * from "./actions";
export * from "./input";
export * from "./loader";

let projectJson: Project | undefined;
export let project: Project | undefined = projectJson;

export const loadScaffoldmeJson = async () => {
  projectJson = await jsonfile.readFile(PROJECT_FILE);
  project = projectJson;
  return projectJson;
};
