var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Relation } from '../relation';
var CustomRelation = (function (_super) {
    __extends(CustomRelation, _super);
    function CustomRelation(attribute, callback) {
        return _super.call(this, 'array-of-models', attribute, null, callback) || this;
    }
    CustomRelation.prototype.set = function (value) {
        if (this.has_callback) {
            return this.callback.call(null, value);
        }
    };
    return CustomRelation;
}(Relation));
export { CustomRelation };
//# sourceMappingURL=custom.js.map