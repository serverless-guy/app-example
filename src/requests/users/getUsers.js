import { get } from "axios"

const url = "https://jsonplaceholder.typicode.com/users"

export function getUsers(userId) {
  if (!userId) {
    return get(url).then(({ data }) => data)
  }

  return get(url + "/" + userId).then(({ data }) => data)
}
