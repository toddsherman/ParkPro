// Polyfill Response/Request if not available in test environment
if (typeof globalThis.Response === "undefined") {
  globalThis.Response = class Response {
    status: number;
    headers: Map<string, string>;
    private _body: string;

    constructor(body?: string | null, init?: { status?: number; headers?: Record<string, string> }) {
      this._body = body ?? "";
      this.status = init?.status ?? 200;
      this.headers = new Map(Object.entries(init?.headers ?? {}));
    }

    async json() {
      return JSON.parse(this._body);
    }

    async text() {
      return this._body;
    }
  } as unknown as typeof Response;
}

if (typeof globalThis.Request === "undefined") {
  globalThis.Request = class Request {
    url: string;
    method: string;

    constructor(input: string, init?: { method?: string }) {
      this.url = input;
      this.method = init?.method ?? "GET";
    }
  } as unknown as typeof Request;
}

export class NextResponse {
  static json(data: unknown, init?: { status?: number; headers?: Record<string, string> }) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    } as ResponseInit);
  }
}

export class NextRequest {
  url: string;
  nextUrl: URL;
  method: string;

  constructor(input: string | URL) {
    const urlStr = typeof input === "string" ? input : input.toString();
    this.url = urlStr;
    this.nextUrl = new URL(urlStr);
    this.method = "GET";
  }
}
