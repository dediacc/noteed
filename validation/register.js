const Validator = require('validator')
const isEmpty = require('is-empty')

const validateRegisterInput = (data) => {
    let errors = {}

    // convert empty fields to empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.password2 = !isEmpty(data.password2) ? data.password2 : ""

    // check name
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required'
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = 'Password must be 6 - 30 characters'
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Confirm password must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput