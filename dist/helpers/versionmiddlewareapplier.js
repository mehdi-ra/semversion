"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionMiddlewareApplier = versionMiddlewareApplier;
function versionMiddlewareApplier(version, middlewares) {
    if (middlewares.length <= 0) {
        return version;
    }
    let modifiedVersion = version;
    for (const middleware of middlewares) {
        modifiedVersion = middleware(modifiedVersion);
    }
    return modifiedVersion;
}
//# sourceMappingURL=versionmiddlewareapplier.js.map