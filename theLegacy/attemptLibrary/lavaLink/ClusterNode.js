"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./base/Node");
class ClusterNode extends Node_1.default {
    constructor(cluster, options) {
        super(options);
        this.cluster = cluster;
        this.send = (guildID, pk) => this.cluster.send(guildID, pk);
        this.tags = new Set(options.tags || []);
        this.on('stats', stats => this.stats = stats);
    }
    emit(name, ...args) {
        if (this.listenerCount(name))
            super.emit(name, ...args);
        return this.cluster.emit(name, ...args);
    }
    async destroy(code, data) {
        await super.destroy(code, data);
        this.cluster.nodes.splice(this.cluster.nodes.indexOf(this), 1);
    }
}
exports.default = ClusterNode;
//# sourceMappingURL=ClusterNode.js.map