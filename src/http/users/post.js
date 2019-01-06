import { httpWrapper } from "@utils/httpWrapper"
import { postUser } from "@requests/users/postUser"
import { newUserValidation } from "@validations/users/newUserValidation"
import { ValidationError } from "@errors/ValidationError"

export const handler = httpWrapper(post, validator)

function post(event, response) {
  const params = JSON.parse(event.body)

  return postUser(params).then(response)
}

function validator(event) {
  if (!event.body) {
    throw new ValidationError()
  }

  const params = JSON.parse(event.body)

  return newUserValidation(params)
}
