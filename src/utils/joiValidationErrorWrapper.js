import { ValidationError } from "@errors/ValidationError"

export function joiValidationErrorWrapper(error) {
  const details = error.details.map((detail) => detail.message)
  const params  = error.details.map((detail) => ({
    param: detail.context.key,
    value: detail.context.value || ""
  }))

  throw new ValidationError({
    code: 400,
    details,
    params
  })
}
