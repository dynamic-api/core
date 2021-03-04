
export class HttpResponse<R> {
    public statusCode: number;
    public headers: { [key: string]: any };
    public body: R;
  
    constructor(body: R, statusCode: number = 200, headers: { [key: string]: any } = {}) {
      this.body = body;
      this.statusCode = statusCode;
      this.headers = headers;
    }
  }
  