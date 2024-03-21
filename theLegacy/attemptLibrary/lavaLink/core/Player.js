"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.Status = void 0;
const events_1 = require("events");
const util_1 = require("util");
var Status;
(function (Status) {
    Status[Status["INSTANTIATED"] = 0] = "INSTANTIATED";
    Status[Status["PLAYING"] = 1] = "PLAYING";
    Status[Status["PAUSED"] = 2] = "PAUSED";
    Status[Status["ENDED"] = 3] = "ENDED";
    Status[Status["ERRORED"] = 4] = "ERRORED";
    Status[Status["STUCK"] = 5] = "STUCK";
    Status[Status["UNKNOWN"] = 6] = "UNKNOWN";
})(Status = exports.Status || (exports.Status = {}));
var EventType;
(function (EventType) {
    EventType["TRACK_START"] = "TrackStartEvent";
    EventType["TRACK_END"] = "TrackEndEvent";
    EventType["TRACK_EXCEPTION"] = "TrackExceptionEvent";
    EventType["TRACK_STUCK"] = "TrackStuckEvent";
    EventType["WEBSOCKET_CLOSED"] = "WebSocketClosedEvent";
})(EventType = exports.EventType || (exports.EventType = {}));
class Player extends events_1.EventEmitter {
    constructor(node, guildID) {
        super();
        this.status = Status.INSTANTIATED;
        this.node = node;
        this.guildID = guildID;
        this.on('event', (d) => {
            switch (d.type) {
                case EventType.TRACK_START:
                    this.status = Status.PLAYING;
                    break;
                case EventType.TRACK_END:
                    if (d.reason !== 'REPLACED')
                        this.status = Status.ENDED;
                    break;
                case EventType.TRACK_EXCEPTION:
                    this.status = Status.ERRORED;
                    break;
                case EventType.TRACK_STUCK:
                    this.status = Status.STUCK;
                    break;
                case EventType.WEBSOCKET_CLOSED:
                    this.status = Status.ENDED;
                    break;
                default:
                    this.status = Status.UNKNOWN;
                    break;
            }
        });
    }
    get playing() {
        return this.status === Status.PLAYING;
    }
    get paused() {
        return this.status === Status.PAUSED;
    }
    get voiceState() {
        const session = this.node.voiceStates.get(this.guildID);
        if (!session)
            return;
        return {
            guild_id: this.guildID,
            user_id: this.node.userID,
            session_id: session,
        };
    }
    get voiceServer() {
        return this.node.voiceServers.get(this.guildID);
    }
    async moveTo(node) {
        if (this.node === node)
            return;
        if (!this.voiceServer || !this.voiceState)
            throw new Error('no voice state/server data to move');
        await this.destroy();
        await Promise.all([
            node.voiceStateUpdate(this.voiceState),
            node.voiceServerUpdate(this.voiceServer),
        ]);
    }
    leave() {
        return this.join(null);
    }
    join(channel, { deaf = false, mute = false } = {}) {
        this.node.voiceServers.delete(this.guildID);
        this.node.voiceStates.delete(this.guildID);
        return this.node.send(this.guildID, {
            op: 4,
            d: {
                guild_id: this.guildID,
                channel_id: channel,
                self_deaf: deaf,
                self_mute: mute,
            },
        });
    }
    async play(track, { start, end, noReplace, pause } = {}) {
        await this.send('play', {
            track: typeof track === 'object' ? track.track : track,
            startTime: start,
            endTime: end,
            noReplace,
            pause
        });
        this.status = Status.PLAYING;
    }
    setVolume(vol) {
        return this.send('volume', { volume: vol });
    }
    setEqualizer(bands) {
        return this.send('equalizer', { bands });
    }
    setFilters(options) {
        return this.send('filters', options);
    }
    seek(position) {
        return this.send('seek', { position });
    }
    async pause(paused = true) {
        await this.send('pause', { pause: paused });
        if (paused)
            this.status = Status.PAUSED;
        else
            this.status = Status.PLAYING;
    }
    async stop() {
        await this.send('stop');
        this.status = Status.ENDED;
    }
    async destroy() {
        if (this.node.connected)
            await this.send('destroy');
        this.status = Status.ENDED;
        this.node.players.delete(this.guildID);
    }
    voiceUpdate(sessionId, event) {
        return this.send('voiceUpdate', {
            event,
            sessionId,
        });
    }
    send(op, d = {}) {
        const conn = this.node.connection;
        if (conn) {
            return conn.send(Object.assign({
                op,
                guildId: this.guildID,
            }, d));
        }
        else {
            return Promise.reject(new Error('no WebSocket connection available'));
        }
    }
}
exports.default = Player;
Player.prototype.setVolume = util_1.deprecate(Player.prototype.setVolume, "Player#setVolume: use setFilters instead");
Player.prototype.setEqualizer = util_1.deprecate(Player.prototype.setEqualizer, "Player#setEqualizer: use setFilters instead");
//# sourceMappingURL=Player.js.map