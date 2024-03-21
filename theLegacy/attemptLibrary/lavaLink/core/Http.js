"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadType = exports.HTTPError = void 0;
const http_1 = require("http");
const url_1 = require("url");
const RoutePlanner_1 = require("./RoutePlanner");
class HTTPError extends Error {
    constructor(httpMessage, method, url) {
        super(`${httpMessage.statusCode} ${http_1.STATUS_CODES[httpMessage.statusCode]}`);
        Object.defineProperty(this, 'statusMessage', { enumerable: true, get: function () { return http_1.STATUS_CODES[httpMessage.statusCode]; } });
        this.statusCode = httpMessage.statusCode;
        this.headers = httpMessage.headers;
        this.name = this.constructor.name;
        this.path = url.toString();
        this.method = method;
    }
}
exports.HTTPError = HTTPError;
var LoadType;
(function (LoadType) {
    LoadType["TRACK_LOADED"] = "TRACK_LOADED";
    LoadType["PLAYLIST_LOADED"] = "PLAYLIST_LOADED";
    LoadType["SEARCH_RESULT"] = "SEARCH_RESULT";
    LoadType["NO_MATCHES"] = "NO_MATCHES";
    LoadType["LOAD_FAILED"] = "LOAD_FAILED";
})(LoadType = exports.LoadType || (exports.LoadType = {}));
class Http {
    constructor(node, input, base) {
        this.routeplanner = new RoutePlanner_1.default(this);
        this.node = node;
        this.input = input;
        this.base = base;
    }
    url() {
        return new url_1.URL(this.input, this.base);
    }
    load(identifier) {
        const url = this.url();
        url.pathname = '/loadtracks';
        url.searchParams.append('identifier', identifier);
        return this.do('GET', url);
    }
    decode(tracks) {
        const url = this.url();
        if (Array.isArray(tracks)) {
            url.pathname = '/decodetracks';
            return this.do('POST', url, Buffer.from(JSON.stringify(tracks)));
        }
        else {
            url.pathname = '/decodetrack';
            url.searchParams.append('track', tracks);
            return this.do('GET', url);
        }
    }
    async do(method, url, data) {
        const message = await new Promise((resolve) => {
            const req = http_1.request({
                method,
                hostname: url.hostname,
                port: url.port,
                protocol: url.protocol,
                path: url.pathname + url.search,
                headers: {
                    Authorization: this.node.password,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }, resolve);
            if (data)
                req.write(data);
            req.end();
        });
        if (message.statusCode && message.statusCode >= 200 && message.statusCode < 300) {
            const chunks = [];
            message.on('data', (chunk) => {
                if (typeof chunk === 'string')
                    chunk = Buffer.from(chunk);
                chunks.push(chunk);
            });
            return new Promise((resolve, reject) => {
                message.once('error', reject);
                message.once('end', () => {
                    message.removeAllListeners();
                    try {
                        const data = Buffer.concat(chunks);
                        resolve(JSON.parse(data.toString()));
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
        }
        throw new HTTPError(message, method, url);
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map