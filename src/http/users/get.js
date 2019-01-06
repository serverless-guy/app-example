import { httpWrapper } from "@utils/httpWrapper"
import { getUsers } from "@requests/users/getUsers"

export const handler = httpWrapper(get)

function get(event, response) {
  const userId = getIdFromQueryString(event)

  return getUsers(userId).then(response)
}

function getIdFromQueryString(event) {
  if (!event.queryStringParameters) {
    return event.queryStringParameters
  }

  return event.queryStringParameters.id
}
