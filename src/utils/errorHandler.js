import { responser } from "@serverless-guy/lambda"

export function errorHandler(event, error) {
  const log = {
    errorMessage: error.message,
    errorCode: error.name
  }

  if (error.severity !== "warn" && error.code !== 503) {
    log.errorStack = error.stack
  }

  console[error.severity || "warn"](log)

  return responser(log, error.code)
}
