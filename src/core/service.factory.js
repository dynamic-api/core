"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceFactory {
    static register(key, service) {
        this.pool[key] = service;
    }
    static get(key, throwErrorIfNotExists = true) {
        let service = this.pool[key];
        if (throwErrorIfNotExists && !service) {
            throw new Error(`The service ${key} is not registered!`);
        }
        return service;
    }
}
ServiceFactory.pool = {};
exports.ServiceFactory = ServiceFactory;
