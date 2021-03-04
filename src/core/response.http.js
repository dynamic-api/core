"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(body, statusCode = 200, headers = {}) {
        this.body = body;
        this.statusCode = statusCode;
        this.headers = headers;
    }
}
exports.HttpResponse = HttpResponse;
