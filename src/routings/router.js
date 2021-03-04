"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Router {
    constructor(routes = {}) {
        this.routes = {};
        this.routes = routes || {};
    }
    register(key, info) {
        this.routes[key] = info;
    }
    get(key, throwErrorIfNotExists = true) {
        let route = this.routes[key];
        if (throwErrorIfNotExists && !route) {
            throw new Error(`The route ${key} is not registered!`);
        }
        return route;
    }
}
exports.Router = Router;
