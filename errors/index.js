const CustomAPIError = require('./custom-error')
const BadRequest = require('./bad-request')
const UnauthorizedError = require('./unauthorized')
const NotFoundError = require('./not-found')
module.exports = {
    CustomAPIError,
    BadRequest,
    UnauthorizedError,
    NotFoundError
}