import { BaseController } from "../controllers/base.controller";
import { ICRUDService } from "../services/crud.service";

export class DynamicAPIModule {
    controllers: { [key: string]: BaseController<any> };
    services: { [key: string]: ICRUDService<any> };
    entities: { [key: string]: any } = {};
}