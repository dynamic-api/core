import { HttpMethods } from "../core/http-methods";
import { HttpRequest } from "../core/request.http";
import { HttpResponse } from "../core/response.http";


export class RouteInfo {
    controller: string;
    handler: (http: HttpRequest<any>) => Promise<HttpResponse<any>>;
    route: string;
    method: HttpMethods;

    constructor(controller: string, method: HttpMethods, route: string, handler: (http: HttpRequest<any>) => Promise<HttpResponse<any>>) {
        this.controller = controller;
        this.handler = handler;
        this.route = route;
        this.method = method;
    }
}
