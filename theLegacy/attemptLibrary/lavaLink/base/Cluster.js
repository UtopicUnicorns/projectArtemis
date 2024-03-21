"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ClusterNode_1 = require("../ClusterNode");
class BaseCluster extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.nodes = [];
        if (options)
            this.spawn(options);
    }
    spawn(options) {
        if (Array.isArray(options))
            return options.map(opt => this.spawn(opt));
        const node = new ClusterNode_1.default(this, options);
        this.nodes.push(node);
        return node;
    }
    sort() {
        return this.nodes.filter(n => n.connected).sort((a, b) => {
            if (!a.stats || !b.stats)
                return -1;
            return (a.stats.cpu ? a.stats.cpu.systemLoad / a.stats.cpu.cores : 0)
                - (b.stats.cpu ? b.stats.cpu.systemLoad / b.stats.cpu.cores : 0);
        });
    }
    getNode(guildID) {
        let node = this.nodes.find(node => node.players.has(guildID));
        if (!node)
            node = this.sort().find(node => this.filter(node, guildID));
        if (node)
            return node;
        throw new Error('unable to find appropriate node; please check your filter');
    }
    has(guildID) {
        return this.nodes.some(node => node.players.has(guildID));
    }
    get(guildID) {
        return this.getNode(guildID).players.get(guildID);
    }
    voiceStateUpdate(state) {
        return this.getNode(state.guild_id).voiceStateUpdate(state);
    }
    voiceServerUpdate(server) {
        return this.getNode(server.guild_id).voiceServerUpdate(server);
    }
}
exports.default = BaseCluster;
//# sourceMappingURL=Cluster.js.map