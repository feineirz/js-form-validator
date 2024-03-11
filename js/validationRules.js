/*
========== Rules format ==========

allowCharacterSet references
	lowercases: 'abcdefghijklmnopqrstuvwxyz'
	uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	anycases: lowercases + uppercaese
	digits: '0123456789'
	symbols: '!@#$%^&?*()_+-=[]:;*,./<>≤'
	all: All of above
	custom: 'Any character specified here'

textTransform references
	upper: Turns all text to uppercase
	lower: Turns all text to lowercase
	wordCapitalize: Uppercase first letter of each word but ignore the left
	wordCapitalize-force: Uppercase first letter of each word and turns the left to lowercase
	SentenceCapitalize: Uppercase first letter of the sentence but ignore the left
	SentenceCapitalize-force: Uppercase first letter of the sentence and turns the left to lowercase

rules = {
    <rulename>: { // Name to refer from "data-validation-rule" attribute of the form element
        minLength: <number>, // Minimum text length to set "minlength" attribute of the form element ***if set minlength attribute in element, it will override this value
        maxLength: <number>, // Maximum text length to set "maxlength" attribute of the form element ***if set maxlength attribute in element, it will override this value
        allowSpaces: <true, false>, // Remove any space from input if set to false
        multiline: <true, false>, // Allow multi line if set to true else remove /n/r
        allowCharacterSet: {
            * See allowCharacterSet reference
        },
		strongPassword: <true, false>, // S\Validate to use a combinations of a-z, A-Z, 0-9 and symbol in password by using strongPasswordRule
        textTransform: '<upper, lower, wordCapitalize, wordCapitalize-force, sentenceCapitalize, sentenceCapitalize-force>', // See textTransform references
    }
}
*/

export const characterSet = (function () {
	const cs = {
		uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowercases: 'abcdefghijklmnopqrstuvwxyz',
		digits: '0123456789',
		symbols: '!@#$%^&?*()_+-=[]:;*,./<>≤',
	};
	cs.anycases = cs.lowercases + cs.uppercases;
	cs.all = cs.uppercases + cs.lowercases + cs.digits + cs.symbols;

	return cs;
})();

export const strongPasswordRule =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=.])[A-Za-z\d!@#$%^&*()\-_+=.]{8,}$/;

export const rules = {
	example: {
		minLength: 8,
		maxLength: 24,
		allowSpaces: false,
		allowCharacterSet: {
			all: true,
		},
		textTransform: 'lower',
	},
	username: {
		minLength: 8,
		maxLength: 24,
		allowSpaces: false,
		allowCharacterSet: {
			anycases: true,
			digits: true,
		},
		textTransform: 'lower',
	},
	password: {
		minLength: 8,
		maxLength: 24,
		allowSpaces: false,
		strongPassword: true,
	},
	firstname: {
		minLength: 2,
		allowSpaces: false,
		textTransform: 'wordCapitalize-force',
	},
	lastname: {
		minLength: 2,
		allowSpaces: false,
		textTransform: 'wordCapitalize-force',
	},
	idnumber: {
		minLength: 5,
		maxLength: 20,
		allowSpaces: false,
		allowCharacterSet: {
			anycases: true,
			digits: true,
		},
		textTransform: 'upper',
	},
	address: {
		minLength: 1,
		allowSpaces: true,
	},
	zipcode: {
		minLength: 5,
		maxLength: 5,
		allowSpaces: false,
		allowCharacterSet: {
			digits: true,
		},
	},
	email: {
		minLength: 3,
		maxLength: 64,
		allowSpaces: false,
		allowCharacterSet: {
			lowercases: true,
			digits: true,
			custom: '@_-.',
		},
		mustContains: [
			{
				characters: '@',
				min: 1,
			},
			{
				characters: characterSet.lowercases,
				min: 1,
			},
			{
				characters: '.',
				min: 1,
			},
		],
	},
	phone: {
		minLength: 9,
		maxLength: 24,
		allowSpaces: true,
	},
};
