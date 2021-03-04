export class HttpRequest<T> {
    public skip: number = 0;
    public take: number = 20;
    public filter: any = { not_exist_field: "NO-FILTER" };
    public orderBy: { [key: string]: number } = {};
    public fields: string;
    public params: { [key: string]: any } = {};
    public queries: { [key: string]: any } = {};
    public includes: string[] = [];
    public headers: { [key: string]: any } = {};
    public body: T;
    public original: any;

    constructor(httpRequest: Request, options: HttpRequestOptions = new HttpRequestOptions()) {
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

    excludeFields(exclude_properties: string[] = []) {
        let parsed = this.parseFields(this.fields);
        return this.stringifyFields(parsed, exclude_properties);
    }

    getHeader(header: string) {
        return this.headers[header] || this.headers[(header || "").toLowerCase()];
    }

    private parseFields(fields: string, exclude_properties: string[] = []) {
        fields = (fields || "-__v").replace(/,/g, " ");
        let mdb_fields: any = {};
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

    private stringifyFields(fields: any, exclude_properties: string[] = []) {
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

    private parseBody(body: any) {
        try {
            body = JSON.parse(body, (JSON as any).dateParser);
        } catch (error) {
            console.log("=> WARNING! Body is not a JSON");
            body = body;
        }
        return body
    }

    private parseFilter(filter: any) {
        console.log("=> Start parse filter");
        try {
            filter = JSON.parse(filter, (JSON as any).dateParser);
        } catch (error) {
            console.log("<= Error to parse filter! DEFAULT VALUE: {}", error);
        }
        return filter;
    }
}

export class HttpRequestOptions {
    public safe: boolean = false;
}

export class Request {
    public queryStringParameters: { [name: string]: any };
    public headers: { [name: string]: string };
    public pathParameters: { [name: string]: string };
    public body: string;
    public original?: any;
}


export function parseOrderBy(fields: string, exclude_properties: string[] = []) {
    fields = (fields || "-__v").replace(/,/g, " ");
    let mdb_fields: any = {};
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

if (JSON && !(JSON as any).dateParser) {
    var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

    (JSON as any).dateParser = function (key: string, value: any) {
        if (typeof value === "string") {
            var a = reISO.exec(value);
            if (a) return new Date(value);
            a = reMsAjax.exec(value);
            if (a) {
                var b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    };
}
