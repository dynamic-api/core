"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_factory_1 = require("../core/service.factory");
const router_1 = require("../routings/router");
const route_info_1 = require("../routings/route-info");
const change_case_1 = __importDefault(require("change-case"));
const pluralize_1 = __importDefault(require("pluralize"));
const http_methods_1 = require("../core/http-methods");
const response_http_1 = require("../core/response.http");
class BaseController {
    constructor(entity, router) {
        this.serviceKey = '';
        this.db = '';
        let className = entity || (this.constructor.name || '').replace('Controller', '');
        let entityName = pluralize_1.default(change_case_1.default.paramCase(className).toLowerCase());
        this.service = service_factory_1.ServiceFactory.get(this.serviceKey, false);
        if (!this.service) {
            this.service = service_factory_1.ServiceFactory.get(`${this.db}.__default`);
            this.service.collection = pluralize_1.default(change_case_1.default.snakeCase(className).toLowerCase());
        }
        this.router = router;
        if (!router) {
            let routes = {};
            routes[className + '.find'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.GET, entityName, this.find.bind(this));
            routes[className + '.findOne'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.GET, entityName + '/{id}', this.findOne.bind(this));
            routes[className + '.add'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.POST, entityName, this.add.bind(this));
            routes[className + '.addMany'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.POST, entityName + '/many', this.add.bind(this));
            routes[className + '.update'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.PUT, entityName + '/{id}', this.update.bind(this));
            routes[className + '.updateMany'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.PUT, entityName, this.updateMany.bind(this));
            routes[className + '.delete'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.DELETE, entityName + '/{id}', this.delete.bind(this));
            routes[className + '.deleteMany'] = new route_info_1.RouteInfo(entityName, http_methods_1.HttpMethods.DELETE, entityName, this.deleteMany.bind(this));
            this.router = new router_1.Router(routes);
        }
    }
    async find(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entities = await this.service.find(http.filter, http.fields, http.skip, http.take, http.orderBy, http.includes, {});
            response.body = entities;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async findOne(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entity = await this.service.findOne(http.filter, http.fields, http.includes, {});
            response.body = entity;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async add(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entity = await this.service.add(http.body);
            response.body = entity;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async addMany(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entities = await this.service.addMany(http.body);
            response.body = entities;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async update(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entity = await this.service.updateById(http.params.id, http.body, http.fields, http.includes, {});
            response.body = entity;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async updateMany(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entities = await this.service.updateMany(http.filter, http.body, http.fields, http.includes, {});
            response.body = entities;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async delete(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entity = await this.service.deleteById(http.params.id, http.fields, http.includes, {});
            response.body = entity;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    async deleteMany(http) {
        let response = new response_http_1.HttpResponse(null);
        if (!this.authorize(http)) {
            response.body = { code: '_UNAUTHORIZE' };
            response.statusCode = 401;
            return response;
        }
        try {
            let entities = await this.service.deleteMany(http.filter, http.fields, http.includes, {});
            response.body = entities;
            return response;
        }
        catch (error) {
            let err = error;
            response.body = {
                error: err.message,
                stack: err.stack,
                name: err.name
            };
            response.statusCode = 500;
            return response;
        }
    }
    authorize(http) {
        return true;
    }
}
exports.BaseController = BaseController;
