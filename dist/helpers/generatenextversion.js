"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNextVersion = generateNextVersion;
const versionupdater_1 = require("./versionupdater");
function generateNextVersion(versionSchema) {
    const nextVersionGen = versionupdater_1.versionUpdater[versionSchema.versionChangeType];
    return nextVersionGen(versionSchema);
}
//# sourceMappingURL=generatenextversion.js.map