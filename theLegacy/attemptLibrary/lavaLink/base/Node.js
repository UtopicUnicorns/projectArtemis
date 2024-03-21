"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("../../webSocket");
const events_1 = require("events");
const Connection_1 = require("../core/Connection");
const Http_1 = require("../core/Http");
const PlayerStore_1 = require("../core/PlayerStore");
class BaseNode extends events_1.EventEmitter {
    constructor({ password, userID, shardCount, hosts, host }) {
        super();
        this.players = new PlayerStore_1.default(this);
        this.voiceStates = new Map();
        this.voiceServers = new Map();
        this._expectingConnection = new Set();
        this.password = password;
        this.userID = userID;
        this.shardCount = shardCount;
        if (host) {
            this.http = new Http_1.default(this, `http://${host}`);
            this.connection = new Connection_1.default(this, `ws://${host}`);
        }
        else if (hosts) {
            if (hosts.rest)
                this.http = new Http_1.default(this, hosts.rest);
            if (hosts.ws)
                this.connection = typeof hosts.ws === 'string' ? new Connection_1.default(this, hosts.ws) : new Connection_1.default(this, hosts.ws.url, hosts.ws.options);
        }
    }
    get connected() {
        if (!this.connection)
            return false;
        return this.connection.ws.readyState === WebSocket.OPEN;
    }
    load(identifier) {
        if (this.http)
            return this.http.load(identifier);
        throw new Error('no available http module');
    }
    decode(tracks) {
        if (this.http)
            return this.http.decode(tracks);
        throw new Error('no available http module');
    }
    voiceStateUpdate(packet) {
        if (packet.user_id !== this.userID)
            return Promise.resolve(false);
        if (packet.channel_id) {
            this.voiceStates.set(packet.guild_id, packet.session_id);
            return this._tryConnection(packet.guild_id);
        }
        else {
            this.voiceServers.delete(packet.guild_id);
            this.voiceStates.delete(packet.guild_id);
        }
        return Promise.resolve(false);
    }
    voiceServerUpdate(packet) {
        this.voiceServers.set(packet.guild_id, packet);
        this._expectingConnection.add(packet.guild_id);
        return this._tryConnection(packet.guild_id);
    }
    disconnect(code, data) {
        if (this.connection)
            return this.connection.close(code, data);
        return Promise.resolve();
    }
    async destroy(code, data) {
        await Promise.all([...this.players.values()].map(player => player.destroy()));
        await this.disconnect(code, data);
    }
    async _tryConnection(guildID) {
        const state = this.voiceStates.get(guildID);
        const server = this.voiceServers.get(guildID);
        if (!state || !server || !this._expectingConnection.has(guildID))
            return false;
        await this.players.get(guildID).voiceUpdate(state, server);
        this._expectingConnection.delete(guildID);
        return true;
    }
}
exports.default = BaseNode;
//# sourceMappingURL=Node.js.map
