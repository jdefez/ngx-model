import { ArrayOfModelsRelation } from './relations/array-of-models';
import { SingleModelRelation } from './relations/single-model';
import { CustomRelation } from './relations/custom';
import { Attribute } from './attribute';
var Model = (function () {
    function Model(attributes) {
        this._attributes = [];
        this._relations = [];
        this.setPrivateProperty('_attributes', []);
        this.setPrivateProperty('_relations', []);
        // Collects attributes and relations definition.
        this.attributesAndRelationsHook();
        // Sets properties private and public accessor and  mutator by using
        // attributes definition.
        this.setProperties();
        // Set initial values if any.
        this.update(attributes);
    }
    Model.prototype.update = function (attributes) {
        var _this = this;
        this.iter(attributes, function (prop, value) {
            if (_this.hasOwnProperty(prop)) {
                _this[prop] = value;
            }
        });
    };
    Model.prototype.setProperties = function () {
        var _this = this;
        this._attributes.forEach(function (attribute) { return _this.setProperty(attribute); });
    };
    Model.prototype.setProperty = function (attribute) {
        // Sets private property.
        this.setPrivateProperty(attribute.private_name, attribute.default_value);
        // Sets property accessor and mutator.
        this.setAccessorAndMutator(attribute.name, attribute.private_name);
    };
    // Attribute methods
    Model.prototype.findAttribute = function (name) {
        var found = this._attributes.find(function (attribute) { return attribute.name === name; });
        if (found) {
            return found;
        }
    };
    Model.prototype.attributeExists = function (name) {
        return this.findAttribute(name) instanceof Attribute;
    };
    Model.prototype.addAttribute = function (name, attribute, formatter) {
        if (this.attributeExists(name) === false) {
            this._attributes.push(new Attribute(name, attribute, formatter));
        }
    };
    Model.prototype.doCast = function (name, value) {
        if (this.attributeExists(name)) {
            var attribute = this.findAttribute(name);
            if (attribute.has_formatter) {
                value = attribute.formatter.call(null, value);
            }
        }
        return value;
    };
    Model.prototype.toJson = function () {
        return JSON.parse(JSON.stringify(this));
    };
    Model.prototype.iter = function (obj, callback) {
        if (obj && typeof callback === 'function') {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    callback.call(this, prop, obj[prop]);
                }
            }
        }
    };
    Model.prototype.setPrivateProperty = function (name, value) {
        Object.defineProperty(this, name, {
            value: value,
            enumerable: false,
            configurable: true,
            writable: true
        });
    };
    Model.prototype.setAccessorAndMutator = function (name, private_name) {
        var _this = this;
        Object.defineProperty(this, name, {
            get: function () { return _this[private_name]; },
            set: function (input) {
                input = _this.applyRelation(name, input);
                _this[private_name] = _this.doCast(name, input);
            },
            enumerable: true,
            configurable: true
        });
    };
    // Relations methods
    Model.prototype.addSingleModelsRelation = function (attribute, model) {
        this._relations.push(new SingleModelRelation(attribute, model));
    };
    Model.prototype.addArrayOfModelsRelation = function (attribute, model) {
        this._relations.push(new ArrayOfModelsRelation(attribute, model));
    };
    Model.prototype.addCustomRelation = function (attribute, callback) {
        // TODO: Test this feature.
        this._relations.push(new CustomRelation(attribute, callback));
    };
    Model.prototype.findRelation = function (attribute) {
        return this._relations.find(function (relation) { return relation.attribute === attribute; });
    };
    Model.prototype.applyRelation = function (attribute, value) {
        var relation = this.findRelation(attribute);
        if (relation) {
            value = relation.set(value);
        }
        return value;
    };
    return Model;
}());
export { Model };
//# sourceMappingURL=model.js.map