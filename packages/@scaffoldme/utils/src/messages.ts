import { EMOJIS } from "./ui/emojis";

export const MESSAGES = {
  SCAFFOLDME_JSON_FILE_NOT_EXIST: `scaffoldme.json file was not found`,
  PROJECT_START: `Installation in progress... ${EMOJIS.COFFEE}`,
  RUNNER_EXECUTION_ERROR: (command: string) =>
    `\nFailed to execute command: ${command}`
};
