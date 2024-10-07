const extracterType = ['s', 'n'];

export function vscanf(...values: Array<string | number>): string {
    const newValues: Array<string> = values.map(String);
    let input = str(newValues.shift() ?? '')
    const inputSpecifiers: Array<string> | null = input.match(/{[s|f|n]{1}.*?}/g)
    try {
        if (inputSpecifiers?.length === newValues.length) {
            inputSpecifiers.forEach((specifier, index) => {
                const specifierParams = specifier.replace(/[{}]/g, "").split(',').map(s => s.trim())
                const specifierType = specifierParams.shift()
                switch (specifierType) {
                    case extracterType[1]:
                        input = formatNumber(input, specifier, newValues[index], specifierParams)
                        break;
                    case extracterType[0]:
                        input = formatString(input, specifier, newValues[index], specifierParams)
                        break;
                }
            });
        } else {
            throw "Arguments length are not same as specifiers length"
        }
    } catch (error) {
        throwError(error)
    }
    return input;
}

const formatString = (input: string, specifier: string, newValue: string, specifierParams: Array<string>): string => {
    const params: Array<number> = specifierParams.map(Number)
    try {
        if (params.length == 2 && params[0] >= 0 && params[1] > 0) {
            return input.replace(specifier, newValue.substring(params[0], params[1]))
        } else if (params.length == 1 && params[0] >= 0) {
            return input.replace(specifier, newValue.substring(0, params[0]))
        } else if (params.length > 0) {
            throw "Substring values are invalid"
        }
        return input.replace(specifier, newValue)
    } catch (error) {
        throwError(error)
        return input.replace(specifier, newValue)
    }
}

const formatNumber = (input: string, specifier: string, newValue: string, specifierParams: Array<string>): string => {
    try {
        let options = {}
        if (specifierParams[0]) {
            if (!num(specifierParams[0])) {
                options = { ...options, currency: specifierParams[0] }
                if (specifierParams[1]) {
                    if (specifierParams[1] === 'true') {
                        options = { ...options, style: 'currency' }
                        return input.replace(specifier, (num(newValue)).toLocaleString(undefined, options));
                    } else {
                        throw "number currency format parameter values are invalid"
                    }
                } else {
                    return input.replace(specifier, (num(newValue)).toLocaleString(undefined, options));
                }
            } else {
                throw "number format parameter values are invalid"
            }
        }
        return input.replace(specifier, newValue)
    } catch (error) {
        throwError(error)
        return input.replace(specifier, newValue)
    }
}

const num = (value: string | number): number => {
    return Number(value)
}

const str = (value: string | number): string => {
    return String(value)
}

const throwError = (e: unknown) => {
    console.log('Catched Error : ', e)
}
