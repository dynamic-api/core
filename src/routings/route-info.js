"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteInfo {
    constructor(controller, method, route, handler) {
        this.controller = controller;
        this.handler = handler;
        this.route = route;
        this.method = method;
    }
}
exports.RouteInfo = RouteInfo;
