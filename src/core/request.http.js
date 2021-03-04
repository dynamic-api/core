"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpRequest {
    constructor(httpRequest, options = new HttpRequestOptions()) {
        this.skip = 0;
        this.take = 20;
        this.filter = { not_exist_field: "NO-FILTER" };
        this.orderBy = {};
        this.params = {};
        this.queries = {};
        this.includes = [];
        this.headers = {};
        this.filter = options.safe ? this.filter : {};
        this.original = httpRequest;
        httpRequest.queryStringParameters = httpRequest.queryStringParameters || {};
        httpRequest.headers = httpRequest.headers || {};
        this.queries = httpRequest.queryStringParameters || {};
        this.skip = parseInt(this.queries.skip) || 0;
        this.take = parseInt(this.queries.take) || 0;
        this.orderBy = parseOrderBy(this.queries.orderBy) || {};
        this.fields = (this.queries.fields || "").replace(/,/g, " ");
        this.params = httpRequest.pathParameters || {};
        this.includes = httpRequest.queryStringParameters.includes
            ? httpRequest.queryStringParameters.includes.replace(/,/g, " ").split(" ")
            : [];
        this.headers = httpRequest.headers;
        console.log("=> Start parse body");
        this.body = this.parseBody(httpRequest.body);
        console.log("=> Start parse filter");
        this.filter = this.parseFilter(this.queries.filter);
        console.log("=> HTTP REQUEST PARSED!");
        console.log(this);
    }
    excludeFields(exclude_properties = []) {
        let parsed = this.parseFields(this.fields);
        return this.stringifyFields(parsed, exclude_properties);
    }
    getHeader(header) {
        return this.headers[header] || this.headers[(header || "").toLowerCase()];
    }
    parseFields(fields, exclude_properties = []) {
        fields = (fields || "-__v").replace(/,/g, " ");
        let mdb_fields = {};
        for (let f of fields.split(" ")) {
            let add = 1;
            if (f[0] == "-") {
                f = f.slice(1, f.length);
                add = 0;
            }
            if (f[0] == "+") {
                f = f.slice(1, f.length);
                add = 1;
            }
            mdb_fields[f] = (exclude_properties || []).indexOf(f) > -1 ? 0 : add;
        }
        return mdb_fields;
    }
    stringifyFields(fields, exclude_properties = []) {
        let adds = [];
        let lesses = [];
        for (let key of Object.keys(fields)) {
            if (fields[key] == 0 && exclude_properties.indexOf(key) == -1) {
                lesses.push(key);
            }
            if (fields[key] == 1 && exclude_properties.indexOf(key) == -1) {
                adds.push(key);
            }
        }
        let adds_string = adds.join(",");
        let lesses_string = lesses.join(",");
        return adds_string + (lesses_string ? "," + lesses_string : "");
    }
    parseBody(body) {
        try {
            body = JSON.parse(body, JSON.dateParser);
        }
        catch (error) {
            console.log("=> WARNING! Body is not a JSON");
            body = body;
        }
        return body;
    }
    parseFilter(filter) {
        console.log("=> Start parse filter");
        try {
            filter = JSON.parse(filter, JSON.dateParser);
        }
        catch (error) {
            console.log("<= Error to parse filter! DEFAULT VALUE: {}", error);
        }
        return filter;
    }
}
exports.HttpRequest = HttpRequest;
class HttpRequestOptions {
    constructor() {
        this.safe = false;
    }
}
exports.HttpRequestOptions = HttpRequestOptions;
class Request {
}
exports.Request = Request;
function parseOrderBy(fields, exclude_properties = []) {
    fields = (fields || "-__v").replace(/,/g, " ");
    let mdb_fields = {};
    for (let f of fields.split(" ")) {
        let add = 1;
        if (f[0] == "-") {
            f = f.slice(1, f.length);
            add = -1;
        }
        if (f[0] == "+") {
            f = f.slice(1, f.length);
            add = 1;
        }
        mdb_fields[f] = (exclude_properties || []).indexOf(f) > -1 ? 1 : add;
    }
    return mdb_fields;
}
exports.parseOrderBy = parseOrderBy;
if (JSON && !JSON.dateParser) {
    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
    JSON.dateParser = function (key, value) {
        if (typeof value === "string") {
            var a = reISO.exec(value);
            if (a)
                return new Date(value);
            a = reMsAjax.exec(value);
            if (a) {
                var b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    };
}
