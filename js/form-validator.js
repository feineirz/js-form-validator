let characterSet = {
    uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercases: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    symbols: '!@#$%^&?*()_+-=[]:;*,./<>≤',
}
characterSet.all = characterSet.uppercases + characterSet.lowercases + characterSet.digits + characterSet.symbols

const rules = {
    code: {
        minLength: 4,
        maxLength: 16,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            uppercases: true,
            digits: true,
            custom: '-',
        },
    },
    code_Capitalize: {
        minLength: 4,
        maxLength: 16,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            uppercases: true,
            digits: true,
            custom: '-',
        },
        textTransform: 'upper',
    },
    username: {
        minLength: 4,
        maxLength: 16,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            digits: true,
        },
        textTransform: 'lower',
    },
    password: {
        minLength: 4,
        maxLength: 32,
        allowSpaces: false,
        allowCharacterSet: {
            all: true,
        },
    },
    password_OnEdit: {
        minLength: 0,
        maxLength: 32,
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
    },
    name: {
        minLength: 3,
        maxLength: 100,
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
    },
    name_WordCapitalize: {
        minLength: 3,
        maxLength: 100,
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    displayname: {
        minLength: 4,
        maxLength: 64,
        allowSpaces: true,
        allowCharacterSet: {
            uppercases: true,
            lowercases: true,
            digits: true,
        },
    },
    phone: {
        minLength: 4,
        maxLength: 64,
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    email: {
        minLength: 8,
        maxLength: 100,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            digits: true,
            symbols: true,
        },
        textTransform: 'lower',
    },
    url: {
        minLength: 8,
        maxLength: 100,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            digits: true,
            symbols: true,
        },
        textTransform: 'lower',
    },
    address: {
        minLength: 4,
        allowSpaces: true,
        multiline: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'capitalize',
    },
    address_WordCapital: {
        minLength: 4,
        allowSpaces: true,
        multiline: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    description: {
        minLength: 0,
        allowSpaces: true,
        multiline: true,
        allowCharacterSet: {
            all: true,
        },
    },
    remark: {
        minLength: 0,
        allowSpaces: true,
        multiline: true,
        allowCharacterSet: {
            all: true,
        },
    },
    path: {
        minLength: 4,
        allowSpaces: false,
        allowCharacterSet: {
            all: true,
        },
    },
    select: {
        defaultIndex: 0,
    },
    identifierTitle: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    identifierValue: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    propertyTitle: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    propertyValue: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
    },
    resistanceTitle: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    resistanceValue: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
    },
    documentTitle: {
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        textTransform: 'word-capitalize',
    },
    number: {
        allowSpaces: false,
        allowCharacterSet: {
            digits: true,
            custom: '.',
        },
    },
    taxNumber: {
        minLength: 13,
        allowSpaces: false,
        allowCharacterSet: {
            digits: true,
        },
    },
}

const emailFormat = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
)

const urlFormat = new RegExp(
    '(https://www.|http://www.|https://|http://)[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?'
)

const WordCapitalize = function (content, force = false) {
    let words = []
    words = content.split(/\_|\ |\r?\n|\r|\n/) // /\-|\_|\ |\r?\n|\r|\n/
    words = force
        ? words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        : words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    words = words.filter(word => word.trim() != '')
    words = words.join(' ')

    // Capitalize after ()
    words = words.split(/\(/) // /\-|\_|\ |\r?\n|\r|\n/
    words = force
        ? words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        : words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    words = words.filter(word => word.trim() != '')
    words = words.join('(')
    return words
}

const SentenceCapitalize = function (content, force = false) {
    let sentences = []

    // Capitalize from spaces and wordbreaks
    sentences = content.split(/\./)
    sentences = force
        ? sentences.map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1).toLowerCase())
        : sentences.map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1))
    sentences = sentences.join('. ').trim()

    return sentences
}

const validateRule = async function (target, validationSubmitEntries) {
    const parentForm = target.closest('form')

    let matchingElement
    let matchingElementMessageLabel
    target.value = target.value.trim()

    const vr = target.validationRule
    let foundError = false

    validationSubmitEntries.forEach(entry => entry.setAttribute('disabled', ''))

    // Init & checking Min, Max
    if (vr) {
        if (target.minLength < 0 && vr.minLength) target.minLength = vr.minLength
        if (target.maxLength < 0 && vr.maxLength) target.maxLength = vr.maxLength

        if (target.minLength >= 0) vr.minLength = target.minLength
        if (target.maxLength >= 0) vr.maxLength = target.maxLength
    }

    let messageLabel = target.parentNode.querySelector('.message-label')

    if (!messageLabel) {
        messageLabel = document.createElement('p')
        messageLabel.classList.add('message-label')
        target.parentNode.insertAdjacentElement('beforeend', messageLabel)
    }

    if (!vr?.multipleSpaces != true) {
        target.value = target.value.replace(/\s+/g, ' ')
    }

    // Validate Allowed Spaces
    if (vr?.allowSpaces != true) {
        target.value = target.value.replace(/\s/g, '')
    }

    // Validate minlength
    if (!foundError) {
        if (vr?.minLength >= 0) {
            if (target.value.length < vr.minLength) {
                target.classList.add('error')
                messageLabel.classList.add('error')
                messageLabel.innerText = `${WordCapitalize(target.name)} must be at lease ${vr.minLength} character(s)!`
                foundError = true
                return
            }
        }
    }

    // Validate maxlength
    if (!foundError) {
        if (vr?.maxLength > 0) {
            if (target.value.length > vr.maxLength) {
                target.classList.add('error')
                messageLabel.classList.add('error')
                messageLabel.innerText = `${WordCapitalize(target.name)} must be less than or equal ${
                    vr.maxLength
                } character(s)!`
                foundError = true
                return
            }
        }
    }

    // textTransform
    if (!foundError) {
        if (vr?.textTransform === 'lower') {
            target.value = target.value.toLowerCase()
        } else if (vr?.textTransform === 'upper') {
            target.value = target.value.toUpperCase()
        } else if (vr?.textTransform === 'capitalize') {
            target.value = SentenceCapitalize(target.value)
        } else if (vr?.textTransform === 'word-capitalize') {
            target.value = WordCapitalize(target.value)
        } else if (vr?.textTransform === 'capitalize-force') {
            target.value = SentenceCapitalize(target.value, true)
        } else if (vr?.textTransform === 'word-capitalize-force') {
            target.value = WordCapitalize(target.value, true)
        }
    }

    // Validate Allowed Character Set
    if (!foundError) {
        if (vr?.allowCharacterSet) {
            let allowedCharacters = ''
            let allowedCharactersHint = ''
            if (vr?.allowCharacterSet.all) {
                allowedCharacters += characterSet.all
                allowedCharactersHint += `(A-Z), (a-z), (0-9), (${characterSet.symbols})`
            } else {
                if (vr?.allowCharacterSet.uppercases) {
                    allowedCharacters += characterSet.uppercases
                    allowedCharactersHint += allowedCharactersHint === '' ? '(A-Z)' : ', (A-Z)'
                }
                if (vr?.allowCharacterSet.lowercases) {
                    allowedCharacters += characterSet.lowercases
                    allowedCharactersHint += allowedCharactersHint === '' ? '(a-z)' : ', (a-z)'
                }
                if (vr?.allowCharacterSet.digits) {
                    allowedCharacters += characterSet.digits
                    allowedCharactersHint += allowedCharactersHint === '' ? '(0-9)' : ', (0-9)'
                }
                if (vr?.allowCharacterSet.symbols) {
                    allowedCharacters += characterSet.symbols
                    allowedCharactersHint +=
                        allowedCharactersHint === '' ? `(${characterSet.symbols})` : `, (${characterSet.symbols})`
                }
                if (vr?.allowCharacterSet.custom) {
                    allowedCharacters += vr?.allowCharacterSet.custom
                    allowedCharactersHint +=
                        allowedCharactersHint === ''
                            ? `(${vr?.allowCharacterSet.custom})`
                            : `, (${vr?.allowCharacterSet.custom})`
                }
            }

            if (vr?.allowSpaces) allowedCharacters += ' '
            if (vr?.multiline) allowedCharacters += '\n\r'

            // console.log('form-validator:::validateRules->allowedCharacters', allowedCharacters)

            target.value.split('').forEach(c => {
                if (!allowedCharacters.includes(c)) {
                    target.classList.add('error')
                    messageLabel.classList.add('error')
                    messageLabel.innerText = `Forbidden character! ${allowedCharactersHint}`
                    foundError = true
                    return
                }
            })
        }
    }

    // Check Min/Max for type=number
    if (target.type === 'number') {
        // console.log('form-validator:::validateRule->target.type="number"->target', target)
        if (!target.value) {
            target.value = target.min ? target.min : 0
        } else {
            try {
                const floatValue = parseFloat(target.value)
                target.value = target.min ? (floatValue < target.min ? target.min : target.value) : target.value
                target.value = target.max ? (floatValue > target.max ? target.max : target.value) : target.value
            } catch (error) {
                target.value = target.min ? target.min : 0
            }
        }
    }

    // Validate Email type
    if (!foundError) {
        if (target.type === 'email') {
            // console.log('form-validator:::validateRules->Check Email format', target)
            if (!emailFormat.test(target.value)) {
                target.classList.add('error')
                messageLabel.classList.add('error')
                messageLabel.innerText = `Invalid Email format!`
                foundError = true
                return
            }
        }
    }

    if (!foundError) {
        if (target.type === 'url') {
            // console.log('form-validator:::validateRules->Check URL format', target)
            if (!urlFormat.test(target.value)) {
                target.classList.add('error')
                messageLabel.classList.add('error')
                messageLabel.innerText = `Invalid URL format!`
                foundError = true
                return
            }
        }
    }

    // Validate Data is Exist
    if (!foundError) {
        const endpoint = target.dataset.validationIsExistEndpoint
        const apiToken = target.dataset.validationApiToken
        const ignoreId = target.dataset.validationIsExistIgnoreId
        const targetValue = target.value

        // console.log('form-validator:::validateRules->apiToken', apiToken)
        if (endpoint) {
            try {
                const res = await fetch(`${endpoint}/${targetValue}`, {
                    method: 'GET',
                    headers: {
                        Authorization: apiToken,
                    },
                })
                // console.log('form-validator:::validateRules->res', res)

                const data = await res.json()
                // console.log('form-validator:::validateRules->data', data)

                if (data.success && data.data[0]) {
                    if (ignoreId) {
                        data.data.forEach(object => {
                            if (object._id != ignoreId) {
                                target.classList.add('error')
                                messageLabel.classList.add('error')
                                // prettier-ignore
                                messageLabel.innerText = `${WordCapitalize(target.name)} "${target.value}" is already EXIST!`
                                foundError = true
                                return
                            }
                        })
                    } else {
                        target.classList.add('error')
                        messageLabel.classList.add('error')
                        // prettier-ignore
                        messageLabel.innerText = `${WordCapitalize(target.name)} "${target.value}" is already EXIST!`
                        foundError = true
                        return
                    }
                }
            } catch (SyntaxError) {
                // console.log('form-validator:::validateRules->fetch.error', error)
                // pass
            }
        }
    }

    // Validate 2 fields value matching (eg. password and confirm password)
    if (!foundError) {
        if (target.dataset.validationMatching) {
            matchingElement = parentForm.querySelector('[name="' + target.dataset.validationMatching + '"]')
            if (matchingElement) {
                if (target.value && matchingElement.value) {
                    if (target.value != matchingElement.value) {
                        target.classList.add('error')
                        messageLabel.classList.add('error')
                        messageLabel.innerText = `${WordCapitalize(target.name)} and ${WordCapitalize(
                            matchingElement.name
                        )} not match!`
                        foundError = true
                        return
                    }
                }
            }
        }
    }

    // Reset style and message
    if (!foundError) {
        target.classList.remove('error', 'warning')
        target.classList.add('success')
        messageLabel.classList.remove('error', 'warning')
        messageLabel.innerText = ''

        if (matchingElement) {
            matchingElement.classList.remove('error', 'warning')
            matchingElement.classList.add('success')

            matchingElementMessageLabel = matchingElement.parentNode.querySelector('.message-label')
            if (matchingElementMessageLabel) {
                matchingElementMessageLabel.classList.remove('error', 'warning')
                matchingElementMessageLabel.innerText = ''
            }
        }
    }

    // Reset validationSubmitEntries if no error left
    const errorElements = parentForm.querySelectorAll('.error')

    // console.log('form-validator:::validateRules->errorElements', errorElements)
    // console.log('form-validator:::validateRules->validationSubmitEntries', validationSubmitEntries)

    if (!errorElements[0] && validationSubmitEntries[0]) {
        validationSubmitEntries?.forEach(entry => {
            try {
                entry.removeAttribute('disabled')
            } catch (error) {
                // pass
            }
        })
    }
}

const assignRules = function () {
    const forms = document.querySelectorAll('form')

    if (forms) {
        forms.forEach(form => {
            const validationSubmitEntries = form.querySelectorAll('.validation-submit-entry')
            const inputs = form.querySelectorAll('input')
            if (inputs) {
                inputs.forEach(input => {
                    let rule = input.dataset?.validationRule ?? undefined
                    if (rule) {
                        input.validationRule = rules[rule]
                        input.addEventListener('blur', e => {
                            validateRule(input, validationSubmitEntries)
                        })
                    }
                })
            }

            const selects = form.querySelectorAll('select')
            if (selects) {
                selects.forEach(select => {
                    let rule = select.dataset?.validationRule ?? undefined
                    if (rule) {
                        select.validationRule = rules[rule]
                        select.addEventListener('change', e => {
                            validateRule(select, validationSubmitEntries)
                        })
                    }
                })
            }

            const textareas = form.querySelectorAll('textarea')
            if (textareas) {
                textareas.forEach(textarea => {
                    let rule = textarea.dataset?.validationRule ?? undefined
                    if (rule) {
                        textarea.validationRule = rules[rule]
                        textarea.addEventListener('blur', e => {
                            validateRule(textarea, validationSubmitEntries)
                        })
                    }
                })
            }
        })
    }
}

assignRules()

export { assignRules }
