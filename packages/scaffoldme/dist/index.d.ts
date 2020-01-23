import { Project } from "@scaffoldme/core";
export * from "./actions";
export * from "./input";
export * from "./loader";
export declare let project: Project | undefined;
export declare const loadScaffoldmeJson: () => Promise<Project | undefined>;
