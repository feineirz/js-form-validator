const characterSet = {
    uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercases: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    symbols: '!@#$%^&*()_+-=[]:;*,.',
    all: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]:;*,.',
}

const rules = {
    username: {
        minLength: 4,
        maxLength: 16,
        allowSpaces: false,
        allowCharacterSet: {
            lowercases: true,
            digits: true,
        },
        transform: 'lower',
    },
    password: {
        minLength: 4,
        maxLength: 32,
        allowSpaces: false,
        allowCharacterSet: {
            all: true,
        },
    },
    displayname: {
        minLength: 4,
        maxLength: 16,
        allowSpaces: true,
        allowCharacterSet: {
            uppercases: true,
            lowercases: true,
        },
    },
    phone: {
        minLength: 4,
        maxLength: 64,
        allowSpaces: true,
        allowCharacterSet: {
            all: true,
        },
        transform: 'word-capitalize',
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
    },
    address: {
        minLength: 4,
        allowSpaces: true,
        multiline: true,
        allowCharacterSet: {
            all: true,
        },
        transform: 'capitalize',
    },
    select: {
        defaultIndex: 0,
    },
}

const WordCapitalize = function (content, force = false) {
    let words = []
    words = content.split(/\-|\_|\ |\r?\n|\r|\n/)
    words = force
        ? words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        : words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    words = words.filter(word => word.trim() != '')
    return words.join(' ')
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

    // Validate Allowed Spaces
    if (!vr.allowSpaces) {
        target.value = target.value.replace(/\s/g, '')
    }

    // Validate minlength
    if (!foundError) {
        if (vr.minLength >= 0) {
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
        if (vr.maxLength > 0) {
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

    // Transform
    if (!foundError) {
        if (vr.transform === 'lower') {
            target.value = target.value.toLowerCase()
        } else if (vr.transform === 'upper') {
            target.value = target.value.toUpperCase()
        } else if (vr.transform === 'capitalize') {
            target.value = SentenceCapitalize(target.value)
        } else if (vr.transform === 'word-capitalize') {
            target.value = WordCapitalize(target.value)
        } else if (vr.transform === 'capitalize-force') {
            target.value = SentenceCapitalize(target.value, true)
        } else if (vr.transform === 'word-capitalize-force') {
            target.value = WordCapitalize(target.value, true)
        }
    }

    // Validate Allowed Character Set
    if (!foundError) {
        if (vr.allowCharacterSet) {
            let allowedCharacters = ''
            let allowedCharactersHint = ''
            if (vr.allowCharacterSet.all) {
                allowedCharacters += characterSet.all
                allowedCharactersHint += `(A-Z), (a-z), (0-9), (${characterSet.symbols})`
            } else {
                if (vr.allowCharacterSet.uppercases) {
                    allowedCharacters += characterSet.uppercases
                    allowedCharactersHint += allowedCharactersHint === '' ? '(A-Z)' : ', (A-Z)'
                }
                if (vr.allowCharacterSet.lowercases) {
                    allowedCharacters += characterSet.lowercases
                    allowedCharactersHint += allowedCharactersHint === '' ? '(a-z)' : ', (a-z)'
                }
                if (vr.allowCharacterSet.digits) {
                    allowedCharacters += characterSet.digits
                    allowedCharactersHint += allowedCharactersHint === '' ? '(0-9)' : ', (0-9)'
                }
                if (vr.allowCharacterSet.symbols) {
                    allowedCharacters += characterSet.symbols
                    allowedCharactersHint +=
                        allowedCharactersHint === '' ? `(${characterSet.symbols})` : `, (${characterSet.symbols})`
                }
            }

            if (vr.allowSpaces) allowedCharacters += ' '
            if (vr.multiline) allowedCharacters += '\n\r'

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

    // Validate Data is Exist
    if (!foundError) {
        const endpoint = target.dataset.validationIsExistEndpoint
        const targetValue = target.value
        if (endpoint) {
            const res = await fetch(`${endpoint}/${targetValue}`)
            const data = await res.json()
            if (data.success) {
                target.classList.add('error')
                messageLabel.classList.add('error')
                messageLabel.innerText = `${WordCapitalize(target.name)} "${target.value}" is already EXIST!`
                foundError = true
                return
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

    if (!errorElements[0]) validationSubmitEntries.forEach(entry => entry.removeAttribute('disabled'))
}

// Collecting forms and Inputs element
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
