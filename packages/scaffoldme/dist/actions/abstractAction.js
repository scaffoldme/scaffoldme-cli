"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class AbstractAction {
    constructor() {
        setTimeout(() => {
            this.getProject();
        }, 3000);
    }
    async getProject() {
        try {
            await console.log("bi");
            this._project = await __1.loadScaffoldmeJson();
        }
        catch (error) {
            console.log(error);
        }
    }
    get project() {
        return this._project;
    }
}
exports.AbstractAction = AbstractAction;
