var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Relation } from '../relation';
var SingleModelRelation = (function (_super) {
    __extends(SingleModelRelation, _super);
    function SingleModelRelation(attribute, model) {
        return _super.call(this, 'single-model', attribute, model) || this;
    }
    SingleModelRelation.prototype.set = function (value) {
        var model = this.model;
        return new model(value);
    };
    return SingleModelRelation;
}(Relation));
export { SingleModelRelation };
//# sourceMappingURL=single-model.js.map