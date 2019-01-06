import { responser } from "@serverless-guy/lambda"

export function errorHandler(event, error) {
  const log = {
    errorMessage: error.message,
    errorCode: error.name
  }

  console.log(error.severity)

  if (error.severity !== "warn") {
    log.errorStack = error.stack
  }

  if (error.params && error.params.length >= 1) {
    log.parameters = error.params
  }

  console[error.severity || "error"](log)

  return responser(log, error.code)
}
