/**
 * Jack of all trades error object
 * @class GenericError
 */
export class GenericError extends Error {
  code = 500

  name = "GenericError"

  message = "Something went wrong"

  details

  params

  constructor(...args) {
    super(...args)

    this.name     = args[0].name || this.name

    this.message  = args[0].message || this.message

    this.code     = args[0].status || this.code

    Error.captureStackTrace(this, GenericError)
  }
}
