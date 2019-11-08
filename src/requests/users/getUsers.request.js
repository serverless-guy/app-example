import { get } from "axios"
import { GenericError } from "@errors/generic.error"

const url = "https://jsonplaceholder.typicode.com/users"

export function getUsers(userId) {
  if (!userId) {
    return get(url).then(({ data }) => data)
  }

  return get(url + "/" + userId).then(({ data }) => data).catch((e) => {
    throw new GenericError({
      status: e.response.status,
      message: e.message
    })
  })
}
