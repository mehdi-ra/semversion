"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = input;
const core_1 = require("@actions/core");
function input(name, options) {
    return (0, core_1.getInput)(name, options);
}
//# sourceMappingURL=getInput.js.map