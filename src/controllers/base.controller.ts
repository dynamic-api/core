import { ServiceFactory } from "../core/service.factory";
import { Router } from "../routings/router";
import { RouteInfo } from "../routings/route-info";
import { ICRUDService } from "../services/crud.service";
import cc from "change-case";
import pluralize from "pluralize";
import { HttpMethods } from "../core/http-methods";
import { HttpRequest } from "../core/request.http";
import { HttpResponse } from "../core/response.http";


export class BaseController<T> {

    public serviceKey: string = '';
    public service: ICRUDService<T>;
    public router: Router;
    public entity: string;

    constructor(entity: string, router?: Router) {
        this.service = ServiceFactory.get(this.serviceKey);
        this.router = router;
        this.entity = entity;
        if (!router) {
            let className = entity || ((<any>this).constructor.name || '').replace('Controller', '');
            let entityName = pluralize(cc.paramCase(className).toLowerCase());

            let routes: { [key: string]: RouteInfo } = {};
            routes[className + '.find'] = new RouteInfo(entityName, HttpMethods.GET, entityName, this.find.bind(this));
            routes[className + '.findOne'] = new RouteInfo(entityName, HttpMethods.GET, entityName + '/{id}', this.findOne.bind(this));
            routes[className + '.add'] = new RouteInfo(entityName, HttpMethods.POST, entityName, this.add.bind(this));
            routes[className + '.addMany'] = new RouteInfo(entityName, HttpMethods.POST, entityName + '/many', this.add.bind(this));
            routes[className + '.update'] = new RouteInfo(entityName, HttpMethods.PUT, entityName + '/{id}', this.update.bind(this));
            routes[className + '.updateMany'] = new RouteInfo(entityName, HttpMethods.PUT, entityName, this.updateMany.bind(this));
            routes[className + '.delete'] = new RouteInfo(entityName, HttpMethods.DELETE, entityName + '/{id}', this.delete.bind(this));
            routes[className + '.deleteMany'] = new RouteInfo(entityName, HttpMethods.DELETE, entityName, this.deleteMany.bind(this));
            this.router = new Router(routes);
        }
    }

    public async find(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async findOne(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async add(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async addMany(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async update(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async updateMany(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async delete(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    public async deleteMany(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse(null);
        return response;
    }

    protected authorize(http: HttpRequest<T>): any {
        let response = new HttpResponse(null);
        return response;
    }

}