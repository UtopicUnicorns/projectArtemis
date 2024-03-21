"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cluster_1 = require("./base/Cluster");
class Cluster extends Cluster_1.default {
    constructor(options) {
        super(options.nodes);
        this.filter = options.filter || (() => true);
        this.send = options.send;
    }
}
exports.default = Cluster;
//# sourceMappingURL=Cluster.js.map