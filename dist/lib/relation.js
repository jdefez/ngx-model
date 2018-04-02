"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Relation {
    constructor(type, attribute, model, callback) {
        this._attribute = attribute;
        this._model = model;
        this._type = type;
        this._callback = callback;
    }
    get attribute() {
        return this._attribute;
    }
    get type() {
        return this._type;
    }
    get model() {
        return this._model;
    }
    get callback() {
        return this._callback;
    }
    get has_callback() {
        return typeof this._callback === 'function';
    }
}
exports.Relation = Relation;
