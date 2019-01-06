export class ValidationError extends Error {
  /**
   * To be used as http status code
   * @var code
   */
  code = 400

  severity = "warn"

  details = []

  params = []

  constructor(...args) {
    super(...args)

    this.name = "ValidationError"

    this.code = args[0].status || this.code

    this.params = args[0].params || this.params

    this.message = "Validation failed, some data didn't match the criteria"

    Error.captureStackTrace(this, ValidationError)
  }
}
