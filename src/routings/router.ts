import { RouteInfo } from "./route-info";

export class Router {

    public routes: { [key: string]: RouteInfo } = {};

    constructor(routes: { [key: string]: RouteInfo } = {}) {
        this.routes = routes || {};
    }

    register(key: string, info: RouteInfo) {
        this.routes[key] = info;
    }

    get(key: string, throwErrorIfNotExists: boolean = true) {
        let route = this.routes[key];
        if (throwErrorIfNotExists && !route) {
            throw new Error(`The route ${key} is not registered!`);
        }
        return route;
    }
}

