"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src/bootstrap"));
__export(require("./src/controllers/base.controller"));
__export(require("./src/core/dynamic-api.module"));
__export(require("./src/core/http-methods"));
__export(require("./src/core/request.http"));
__export(require("./src/core/response.http"));
__export(require("./src/core/service.factory"));
__export(require("./src/routings/router"));
__export(require("./src/routings/route-info"));
