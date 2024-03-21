"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class PlayerStore extends Map {
    constructor(node) {
        super();
        this.node = node;
    }
    get(key) {
        let player = super.get(key);
        if (!player) {
            player = new Player_1.default(this.node, key);
            this.set(key, player);
        }
        return player;
    }
}
exports.default = PlayerStore;
//# sourceMappingURL=PlayerStore.js.map