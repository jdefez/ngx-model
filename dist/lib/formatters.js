var Formatters = (function () {
    function Formatters() {
    }
    Formatters.toInteger = function (value) {
        value = String(value).replace(/\s+/, '');
        if (Number.isNaN(parseInt(value, 10))) {
            return 0;
        }
        else {
            return parseInt(value, 10);
        }
    };
    Formatters.toFloat = function (value) {
        value = String(value).replace(/,/, '.');
        if (Number.isNaN(Number.parseFloat(value))) {
            return 0;
        }
        else {
            return Number.parseFloat(value);
        }
    };
    Formatters.toString = function (value) {
        return String(value);
    };
    Formatters.toBoolean = function (value) {
        if (String(value) === 'false') {
            return false;
        }
        return Boolean(value);
    };
    return Formatters;
}());
export { Formatters };
//# sourceMappingURL=formatters.js.map