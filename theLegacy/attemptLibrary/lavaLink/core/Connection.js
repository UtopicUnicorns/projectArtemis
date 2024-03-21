"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("../../webSocket");
const backoff = require("../backOff");
const package_json_1 = require("../../package.json");
class Connection {
    constructor(node, url, options = {}) {
        this.reconnectTimeout = 100; // TODO: remove in next major version
        this._listeners = {
            open: () => {
                this.backoff.reset();
                this.node.emit('open');
                this._flush()
                    .then(() => this.configureResuming(this.options.resumeTimeout, this.options.resumeKey))
                    .catch(e => this.node.emit('error', e));
            },
            close: (code, reason) => {
                this.node.emit('close', code, reason);
                this._reconnect();
            },
            upgrade: (req) => this.node.emit('upgrade', req),
            message: (d) => {
                if (Array.isArray(d))
                    d = Buffer.concat(d);
                else if (d instanceof ArrayBuffer)
                    d = Buffer.from(d);
                let pk;
                try {
                    pk = JSON.parse(d.toString());
                }
                catch (e) {
                    this.node.emit('error', e);
                    return;
                }
                if (pk.guildId && this.node.players.has(pk.guildId))
                    this.node.players.get(pk.guildId).emit(pk.op, pk);
                this.node.emit(pk.op, pk);
            },
            error: (err) => {
                this.node.emit('error', err);
                this._reconnect();
            },
        };
        this._queue = [];
        this.node = node;
        this.url = url;
        this.options = options;
        this.resumeKey = options.resumeKey;
        this.backoff = backoff.exponential();
        this._send = this._send.bind(this);
        this.connect();
    }
    get backoff() {
        return this._backoff;
    }
    set backoff(b) {
        b.on('ready', (number, delay) => {
            this.reconnectTimeout = delay;
            this.connect();
        });
        b.on('backoff', (number, delay) => this.reconnectTimeout = delay);
        if (this._backoff)
            this._backoff.removeAllListeners();
        this._backoff = b;
    }
    connect() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN)
            this.ws.close();
        const headers = {
            Authorization: this.node.password,
            'Num-Shards': this.node.shardCount || 1,
            "Client-Name": `${package_json_1.name}/v${package_json_1.version}`,
            'User-Id': this.node.userID,
        };
        if (this.resumeKey)
            headers['Resume-Key'] = this.resumeKey;
        this.ws = new WebSocket(this.url, Object.assign({ headers }, this.options));
        this._registerWSEventListeners();
    }
    configureResuming(timeout = 60, key = Math.random().toString(36)) {
        this.resumeKey = key;
        return this.send({
            op: 'configureResuming',
            key,
            timeout,
        });
    }
    send(d) {
        return new Promise((resolve, reject) => {
            const encoded = JSON.stringify(d);
            const send = { resolve, reject, data: encoded };
            if (this.ws.readyState === WebSocket.OPEN)
                this._send(send);
            else
                this._queue.push(send);
        });
    }
    close(code, data) {
        if (!this.ws)
            return Promise.resolve();
        this.ws.removeListener('close', this._listeners.close);
        return new Promise(resolve => {
            this.ws.once('close', (code, reason) => {
                this.node.emit('close', code, reason);
                resolve();
            });
            this.ws.close(code, data);
        });
    }
    _reconnect() {
        if (this.ws.readyState === WebSocket.CLOSED)
            this.backoff.backoff();
    }
    _registerWSEventListeners() {
        for (const [event, listener] of Object.entries(this._listeners)) {
            if (!this.ws.listeners(event).includes(listener))
                this.ws.on(event, listener);
        }
    }
    async _flush() {
        await Promise.all(this._queue.map(this._send));
        this._queue = [];
    }
    _send({ resolve, reject, data }) {
        this.ws.send(data, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    }
}
exports.default = Connection;
//# sourceMappingURL=Connection.js.map
