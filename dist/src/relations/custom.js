"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../relation");
class CustomRelation extends relation_1.Relation {
    constructor(attribute, callback) {
        super('array-of-models', attribute, null, callback);
    }
    set(value) {
        if (this.has_callback) {
            return this.callback.call(null, value);
        }
    }
}
exports.CustomRelation = CustomRelation;
