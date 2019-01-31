import { ExternalAPIClientException } from "@errors/ExternalAPIClientException"
import { ExternalAPIInternalServerException } from "@errors/ExternalAPIInternalServerException"
import axios from "axios"

/**
 * Request HTTP endpoint POST
 * @param endpoint endpoint to be requested
 * @param body POST data / payload
 * @param options addition http options
 * @return AxiosPromise
 */
export function requestPost(endpoint, body = {}, options = {}) {
  return axios.post(endpoint, body, options).catch((error) => {
    if (error.response.status < 500) {
      throw new ExternalAPIClientException({
        details: {
          payload: body,
          response: error.response.data
        },
        params: body,
        status: error.response.status
      })
    }

    throw new ExternalAPIInternalServerException({
      details: {
        payload: body,
        response: error.response.data
      },
      params: body,
      status: error.response.status
    })
  })
}

/**
 * Request HTTP endpoint GET
 * @param endpoint endpoint to be requested
 * @param options addition http options
 * @return AxiosPromise
 */
export function requestGet(endpoint, options = {}) {
  return axios.get(endpoint, options).catch((error) => {
    if (error.response.status < 500) {
      throw new ExternalAPIClientException({
        details: {
          response: error.response.data
        },
        status: error.response.status
      })
    }

    throw new ExternalAPIInternalServerException({
      details: {
        response: error.response.data
      },
      params: [],
      status: error.response.status
    })
  })
}
