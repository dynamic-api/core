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
        this.service = service_factory_1.ServiceFactory.get(this.serviceKey);
        this.router = router;
        this.entity = entity;
        if (!router) {
            let className = entity || (this.constructor.name || '').replace('Controller', '');
            let entityName = pluralize_1.default(change_case_1.default.paramCase(className).toLowerCase());
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
        return response;
    }
    async findOne(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async add(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async addMany(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async update(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async updateMany(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async delete(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    async deleteMany(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
    authorize(http) {
        let response = new response_http_1.HttpResponse(null);
        return response;
    }
}
exports.BaseController = BaseController;
