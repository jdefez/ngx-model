var Attribute = (function () {
    function Attribute(name, default_value, formatter) {
        if (default_value === void 0) { default_value = null; }
        if (formatter === void 0) { formatter = null; }
        this._default_value = default_value;
        this._formatter = formatter;
        this._name = name;
    }
    Object.defineProperty(Attribute.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "private_name", {
        get: function () {
            return "_" + this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "default_value", {
        get: function () {
            return this._default_value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "formatter", {
        get: function () {
            return this._formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Attribute.prototype, "has_formatter", {
        get: function () {
            return typeof this.formatter === 'function';
        },
        enumerable: true,
        configurable: true
    });
    return Attribute;
}());
export { Attribute };
//# sourceMappingURL=attribute.js.map