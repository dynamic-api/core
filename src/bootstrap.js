"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_factory_1 = require("./core/service.factory");
class Application {
    constructor() {
        this.controllers = {};
        this.entities = {};
        this.db = 'default';
    }
    parseRequest(request) {
        return request;
    }
    parseResponse(response) {
        return response;
    }
    registerControllers(controllers) {
        Object.assign(this.controllers, controllers);
    }
    registerServices(services) {
        for (let key in services) {
            service_factory_1.ServiceFactory.register(key, services[key]);
        }
    }
    registerEntities(entities) {
        Object.assign(this.entities, entities);
    }
    bootstrap(modules = []) {
        for (let module of modules) {
            this.registerControllers(module.controllers);
            this.registerServices(module.services);
            this.registerEntities(module.entities);
        }
    }
}
exports.Application = Application;
