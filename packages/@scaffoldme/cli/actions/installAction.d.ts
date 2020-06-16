import { Input } from "../input";
import { AbstractAction } from "./abstractAction";
export declare class InstallAction extends AbstractAction {
    /**
     * @param  {Input[]} inputs
     * @param  {Input[]} options
     */
    handle(inputs: Input[], options: Input[]): Promise<void>;
}
/**
 * Check if scaffoldme file exist
/*
**
const checkScaffoldmeJsonFile = async () => {
  try {
    if (!fs.existsSync(PROJECT_FILE)) {
      console.error(chalk.red(MESSAGES.SCAFFOLDME_JSON_FILE_NOT_EXIST));
      process.exit(0);
    }
  } catch (err) {
    console.error(chalk.red("ERROR"));
    process.exit(0);
  }
};
 */
