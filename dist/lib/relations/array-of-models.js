var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Relation } from '../relation';
var ArrayOfModelsRelation = (function (_super) {
    __extends(ArrayOfModelsRelation, _super);
    function ArrayOfModelsRelation(attribute, model) {
        return _super.call(this, 'custom-relation', attribute, model) || this;
    }
    ArrayOfModelsRelation.prototype.set = function (value) {
        var _this = this;
        // TODO: check value and value items type.
        value = value.map(function (item) {
            var model = _this.model;
            return new model(item);
        });
        return value;
    };
    return ArrayOfModelsRelation;
}(Relation));
export { ArrayOfModelsRelation };
//# sourceMappingURL=array-of-models.js.map