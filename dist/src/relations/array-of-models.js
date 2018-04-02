"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relation_1 = require("../relation");
class ArrayOfModelsRelation extends relation_1.Relation {
    constructor(attribute, model) {
        super('custom-relation', attribute, model);
    }
    set(value) {
        // TODO: check value and value items type.
        value = value.map((item) => {
            const model = this.model;
            return new model(item);
        });
        return value;
    }
}
exports.ArrayOfModelsRelation = ArrayOfModelsRelation;
