"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Formatters {
    static toInteger(value) {
        value = String(value).replace(/\s+/, '');
        if (Number.isNaN(parseInt(value, 10))) {
            return 0;
        }
        else {
            return parseInt(value, 10);
        }
    }
    static toFloat(value) {
        value = String(value).replace(/,/, '.');
        if (Number.isNaN(Number.parseFloat(value))) {
            return 0;
        }
        else {
            return Number.parseFloat(value);
        }
    }
    static toString(value) {
        return String(value);
    }
    static toBoolean(value) {
        if (String(value) === 'false') {
            return false;
        }
        return Boolean(value);
    }
}
exports.Formatters = Formatters;
