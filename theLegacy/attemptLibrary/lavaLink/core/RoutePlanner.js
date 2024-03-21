"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoutePlanner {
    constructor(http) {
        this.http = http;
    }
    status() {
        const url = this.http.url();
        url.pathname = '/routeplanner/status';
        return this.http.do('get', url);
    }
    unmark(address) {
        const url = this.http.url();
        if (address) {
            url.pathname = '/routeplanner/free/address';
            return this.http.do('post', url, Buffer.from(JSON.stringify({ address })));
        }
        url.pathname = '/routeplanner/free/all';
        return this.http.do('post', url);
    }
}
exports.default = RoutePlanner;
//# sourceMappingURL=RoutePlanner.js.map