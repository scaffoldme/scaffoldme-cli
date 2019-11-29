"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstractAction_1 = require("./abstractAction");
class InstallAction extends abstractAction_1.AbstractAction {
    async handle(inputs, options) {
        console.log('input ----', inputs);
        console.log('options -----', options);
        process.exit(0);
    }
}
exports.InstallAction = InstallAction;
//# sourceMappingURL=installAction.js.map