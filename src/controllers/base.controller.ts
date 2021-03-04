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
    public db: string = '';
    public service: ICRUDService<T>;
    public router: Router;

    constructor(entity: string, router?: Router) {
        let className = entity || ((<any>this).constructor.name || '').replace('Controller', '');
        let entityName = pluralize(cc.paramCase(className).toLowerCase());

        this.service = ServiceFactory.get(this.serviceKey, false);
        if (!this.service) {
            this.service = ServiceFactory.get(`${this.db}.__default`);
            this.service.collection = pluralize(cc.snakeCase(className).toLowerCase());
        }

        this.router = router;
        if (!router) {
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
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entities: T[] = await this.service.find(http.filter, http.fields, http.skip, http.take, http.orderBy, http.includes, {});
            response.body = entities;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async findOne(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entity: T = await this.service.findOne(http.filter, http.fields, http.includes, {});
            response.body = entity;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async add(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entity: T = await this.service.add(http.body);
            response.body = entity;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async addMany(http: HttpRequest<T[]>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entities: T[] = await this.service.addMany(http.body);
            response.body = entities;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async update(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entity: T = await this.service.updateById(http.params.id, http.body, http.fields, http.includes, {});
            response.body = entity;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async updateMany(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entities: T[] = await this.service.updateMany(http.filter, http.body, http.fields, http.includes, {});
            response.body = entities;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async delete(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entity: T = await this.service.deleteById(http.params.id, http.fields, http.includes, {});
            response.body = entity;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    public async deleteMany(http: HttpRequest<T>): Promise<HttpResponse<any>> {
        let response = new HttpResponse<any>(null);

        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }

        try {
            let entities: T[] = await this.service.deleteMany(http.filter, http.fields, http.includes, {});
            response.body = entities;
            return response;
        } catch (error) {
            let err: Error = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            }
            response.statusCode = 500;
            return response;
        }
    }

    protected authorize(http: HttpRequest<any>): any {
        return true;
    }

}