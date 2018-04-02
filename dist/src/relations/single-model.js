"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../relation");
class SingleModelRelation extends relation_1.Relation {
    constructor(attribute, model) {
        super('single-model', attribute, model);
    }
    set(value) {
        const model = this.model;
        return new model(value);
    }
}
exports.SingleModelRelation = SingleModelRelation;
