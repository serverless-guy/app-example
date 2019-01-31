/**
 * Tells our API consumer that something has happened while communicating with external API
 * @class ExternalAPIRequestException
 */
export class ExternalAPIClientException extends Error {
  code = 400

  name = "ExternalAPIClientException"

  message = "External API returned a bad request"

  details

  params

  constructor(...args) {
    super(...args)

    this.details = args[0].details || this.details

    this.code = args[0].status || this.code

    this.params  = args[0].params || this.params

    Error.captureStackTrace(this, ExternalAPIClientException)
  }
}
