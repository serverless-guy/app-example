import * as joi from "joi"
import { joiValidationErrorWrapper } from "@utils/joiValidationErrorWrapper"

const addUserSchema = joi.object().keys({
  name:     joi.string(),
  username: joi.string(),
  email:    joi.string().email(),
  address:  joi.any(),
  phone:    joi.string(),
  website:  joi.string(),
  company:  joi.any()
})

/**
 * Validate the provided request body from /code/sync
 * @param data data from /code/sync endpoint
 * @return object
 */
export function postUserValidation(data) {
  return joi.validate(data, addUserSchema, { abortEarly: false }).catch(joiValidationErrorWrapper)
}
