import { post } from "axios"
import { GenericError } from "@errors/generic.error"

const url = "https://jsonplaceholder.typicode.com/users"

export function postUser(user) {
  return post(url, user).then(({ data }) => data).catch((e) => {
    throw new GenericError({
      status: e.response.status,
      message: e.message
    })
  })
}
