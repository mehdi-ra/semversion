"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = output;
const core_1 = require("@actions/core");
function output(name, context) {
    (0, core_1.setOutput)(name, context);
}
//# sourceMappingURL=setoutput.js.map