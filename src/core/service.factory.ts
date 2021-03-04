import { ICRUDService } from "../services/crud.service"

export class ServiceFactory {
    static pool: { [key: string]: ICRUDService<any> } = {};

    static register<T>(key: string, service: ICRUDService<T>) {
        this.pool[key] = service;
    }

    static get(key: string, throwErrorIfNotExists: boolean = true) {
        let service = this.pool[key];
        if (throwErrorIfNotExists && !service) {
            throw new Error(`The service ${key} is not registered!`);
        }
        return service;
    }

}