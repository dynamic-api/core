import { BaseController } from "./controllers/base.controller";
import { DynamicAPIModule } from "./core/dynamic-api.module";
import { HttpRequest } from "./core/request.http";
import { HttpResponse } from "./core/response.http";
import { ICRUDService } from "./services/crud.service";

export interface IApplication {
    controllers: { [key: string]: BaseController<any> };
    entities: { [key: string]: any };

    parseRequest(request: any): HttpRequest<any>
    parseResponse(response: HttpResponse<any>): any

    registerControllers(controllers: { [key: string]: BaseController<any> }): void
    registerServices(services: { [key: string]: ICRUDService<any> }): void
    registerEntities(entities: { [key: string]: ICRUDService<any> }): void
    bootstrap(modules: DynamicAPIModule[]): void
}