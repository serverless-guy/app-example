import { httpWrapper } from "@utils/httpWrapper"
import { postUser } from "@requests/users/postUser"
import { newUserValidation } from "@validations/users/newUserValidation"
import { ValidationError } from "@errors/ValidationError"

export const handler = httpWrapper(post)

function post(event, response) {
  const params = JSON.parse(event.body)

  if (!params) {
    throw new ValidationError({})
  }

  return newUserValidation(params).then(postUser).then(response)
}
