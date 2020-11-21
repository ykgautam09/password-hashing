const unicodePassgen = require('unicode-passgen')
const randomString = require('randomstring')

function generate_password(onlyDigit = false, isNumber = true, isUpper, isSpecial, _length = 10) {
    console.log(onlyDigit, isNumber, isUpper, isSpecial, _length)
    if (typeof isSpecial !== 'undefined' && typeof isSpecial !== 'boolean') {     // capital-small-digit-special
        let options = {
            include: [
                {
                    chars: [['alpha']], min: 1
                },
                {
                    chars: [['alpha_upper']], min: 1
                },
                {
                    chars: [['numeric']], min: 1
                },
                {
                    chars: [['symbols']], min: 1
                }
            ]
        }
        return unicodePassgen.generate(_length, options)
    }
    let configuration = {}
    configuration.length = _length

    if (onlyDigit == 'on')              // only digit
    {
        configuration.charset = 'numeric'
    } else {
        if (isNumber && !isUpper)   //both true then capital-small-digit
        {
            configuration.charset = 'alphanumeric'
        } else {
            if (!isNumber)                  //only small
                configuration.charset = 'alphabetic'
            configuration.capitalization = 'lowercase'
        }

    }
    console.log(configuration)
    return randomString.generate(configuration)

}

module.exports = {
    generate: generate_password
}