/**
 * Tells our API consumer that something has happened while communicating with external API
 * @class ExternalAPIRequestException
 */
export class ExternalAPIInternalServerException extends Error {
  code = 500

  name = "ExternalAPIRequestException"

  message = "Something went wrong while our system is accessing an external API."

  details

  params

  constructor(...args) {
    super(...args)

    this.details = args[0].details || this.details

    this.code = args[0].status || this.code

    this.params  = args[0].params || this.params

    Error.captureStackTrace(this, ExternalAPIInternalServerException)
  }
}
