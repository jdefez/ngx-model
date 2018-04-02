"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attribute {
    constructor(name, default_value = null, formatter = null) {
        this._default_value = default_value;
        this._formatter = formatter;
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get private_name() {
        return `_${this.name}`;
    }
    get default_value() {
        return this._default_value;
    }
    get formatter() {
        return this._formatter;
    }
    get has_formatter() {
        return typeof this.formatter === 'function';
    }
}
exports.Attribute = Attribute;
