var Relation = (function () {
    function Relation(type, attribute, model, callback) {
        this._attribute = attribute;
        this._model = model;
        this._type = type;
        this._callback = callback;
    }
    Object.defineProperty(Relation.prototype, "attribute", {
        get: function () {
            return this._attribute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relation.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relation.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relation.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Relation.prototype, "has_callback", {
        get: function () {
            return typeof this._callback === 'function';
        },
        enumerable: true,
        configurable: true
    });
    return Relation;
}());
export { Relation };
//# sourceMappingURL=relation.js.map