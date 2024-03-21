"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./base/Node");
class Node extends Node_1.default {
    constructor(options) {
        super(options);
        this.send = options.send;
    }
}
exports.default = Node;
//# sourceMappingURL=Node.js.map