"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_of_models_1 = require("./relations/array-of-models");
const single_model_1 = require("./relations/single-model");
const custom_1 = require("./relations/custom");
const attribute_1 = require("./attribute");
class Model {
    constructor(attributes) {
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
    update(attributes) {
        this.iter(attributes, (prop, value) => {
            if (this.hasOwnProperty(prop)) {
                this[prop] = value;
            }
        });
    }
    setProperties() {
        this._attributes.forEach((attribute) => this.setProperty(attribute));
    }
    setProperty(attribute) {
        // Sets private property.
        this.setPrivateProperty(attribute.private_name, attribute.default_value);
        // Sets property accessor and mutator.
        this.setAccessorAndMutator(attribute.name, attribute.private_name);
    }
    // Attribute methods
    findAttribute(name) {
        const found = this._attributes.find((attribute) => attribute.name === name);
        if (found) {
            return found;
        }
    }
    attributeExists(name) {
        return this.findAttribute(name) instanceof attribute_1.Attribute;
    }
    addAttribute(name, attribute, formatter) {
        if (this.attributeExists(name) === false) {
            this._attributes.push(new attribute_1.Attribute(name, attribute, formatter));
        }
    }
    doCast(name, value) {
        if (this.attributeExists(name)) {
            const attribute = this.findAttribute(name);
            if (attribute.has_formatter) {
                value = attribute.formatter.call(null, value);
            }
        }
        return value;
    }
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
    iter(obj, callback) {
        if (obj && typeof callback === 'function') {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    callback.call(this, prop, obj[prop]);
                }
            }
        }
    }
    setPrivateProperty(name, value) {
        Object.defineProperty(this, name, {
            value: value,
            enumerable: false,
            configurable: true,
            writable: true
        });
    }
    setAccessorAndMutator(name, private_name) {
        Object.defineProperty(this, name, {
            get: () => this[private_name],
            set: (input) => {
                input = this.applyRelation(name, input);
                this[private_name] = this.doCast(name, input);
            },
            enumerable: true,
            configurable: true
        });
    }
    // Relations methods
    addSingleModelsRelation(attribute, model) {
        this._relations.push(new single_model_1.SingleModelRelation(attribute, model));
    }
    addArrayOfModelsRelation(attribute, model) {
        this._relations.push(new array_of_models_1.ArrayOfModelsRelation(attribute, model));
    }
    addCustomRelation(attribute, callback) {
        // TODO: Test this feature.
        this._relations.push(new custom_1.CustomRelation(attribute, callback));
    }
    findRelation(attribute) {
        return this._relations.find((relation) => relation.attribute === attribute);
    }
    applyRelation(attribute, value) {
        const relation = this.findRelation(attribute);
        if (relation) {
            value = relation.set(value);
        }
        return value;
    }
}
exports.Model = Model;
