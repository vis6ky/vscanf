"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vscanf = void 0;
const extracterType = ['s', 'n'];
function vscanf(...values) {
    var _a;
    const newValues = values.map(String);
    let input = str((_a = newValues.shift()) !== null && _a !== void 0 ? _a : '');
    const inputSpecifiers = input.match(/{[s|f|n]{1}.*?}/g);
    try {
        if ((inputSpecifiers === null || inputSpecifiers === void 0 ? void 0 : inputSpecifiers.length) === newValues.length) {
            inputSpecifiers.forEach((specifier, index) => {
                const specifierParams = specifier.replace(/[{}]/g, "").split(',').map(s => s.trim());
                const specifierType = specifierParams.shift();
                switch (specifierType) {
                    case extracterType[1]:
                        input = formatNumber(input, specifier, newValues[index], specifierParams);
                        break;
                    case extracterType[0]:
                        input = formatString(input, specifier, newValues[index], specifierParams);
                        break;
                }
            });
        }
        else {
            throw "Arguments length are not same as specifiers length";
        }
    }
    catch (error) {
        throwError(error);
    }
    return input;
}
exports.vscanf = vscanf;
const formatString = (input, specifier, newValue, specifierParams) => {
    const params = specifierParams.map(Number);
    try {
        if (params.length == 2 && params[0] >= 0 && params[1] > 0) {
            return input.replace(specifier, newValue.substring(params[0], params[1]));
        }
        else if (params.length == 1 && params[0] >= 0) {
            return input.replace(specifier, newValue.substring(0, params[0]));
        }
        else if (params.length > 0) {
            throw "Substring values are invalid";
        }
        return input.replace(specifier, newValue);
    }
    catch (error) {
        throwError(error);
        return input.replace(specifier, newValue);
    }
};
const formatNumber = (input, specifier, newValue, specifierParams) => {
    try {
        let options = {};
        if (specifierParams[0]) {
            if (!num(specifierParams[0])) {
                options = Object.assign(Object.assign({}, options), { currency: specifierParams[0] });
                if (specifierParams[1]) {
                    if (specifierParams[1] === 'true') {
                        options = Object.assign(Object.assign({}, options), { style: 'currency' });
                        return input.replace(specifier, (num(newValue)).toLocaleString(undefined, options));
                    }
                    else {
                        throw "number currency format parameter values are invalid";
                    }
                }
                else {
                    return input.replace(specifier, (num(newValue)).toLocaleString(undefined, options));
                }
            }
            else {
                throw "number format parameter values are invalid";
            }
        }
        return input.replace(specifier, newValue);
    }
    catch (error) {
        throwError(error);
        return input.replace(specifier, newValue);
    }
};
const num = (value) => {
    return Number(value);
};
const str = (value) => {
    return String(value);
};
const throwError = (e) => {
    console.log('Catched Error : ', e);
};
