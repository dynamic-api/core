import { IApplication } from "./application.interface";
import { BaseController } from "./controllers/base.controller";
import { DynamicAPIModule } from "./core/dynamic-api.module";
import { HttpRequest } from "./core/request.http";
import { HttpResponse } from "./core/response.http";
import { ServiceFactory } from "./core/service.factory";
import { ICRUDService } from "./services/crud.service";

export class Application implements IApplication {

    controllers: { [key: string]: BaseController<any> } = {};
    entities: { [key: string]: any } = {};
    db: string = 'default';

    parseRequest(request: any): HttpRequest<any> {
        return request;
    }

    parseResponse(response: HttpResponse<any>): any {
        return response;
    }

    registerControllers(controllers: { [key: string]: BaseController<any> }) {
        Object.assign(this.controllers, controllers);
    }

    registerServices(services: { [key: string]: ICRUDService<any> }) {
        for (let key in services) {
            ServiceFactory.register(key, services[key]);
        }
    }

    registerEntities(entities: { [key: string]: ICRUDService<any> }) {
        Object.assign(this.entities, entities);
    }

    bootstrap(modules: DynamicAPIModule[] = []) {
        for (let module of modules) {
            this.registerControllers(module.controllers);
            this.registerServices(module.services);
            this.registerEntities(module.entities);
        }
    }
}