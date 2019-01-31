import { wrapper } from "@serverless-guy/lambda"
import { errorHandler } from "@utils/errorHandler"
import { GenericError } from "@errors/GenericError"

export function httpWrapper(lambdaFunc, ...additionalMiddlewares) {
  return wrapper(
    lambdaFunc,
    errorHandler,
    logParams,
    maintenanceMiddleware,
    ...additionalMiddlewares
  )
}

function logParams(request, next) {
  const { event, context } = request

  console.log({
    body: event.body ? JSON.parse(event.body) : undefined,
    pathParams: event.pathParameters,
    queryString: event.queryStringParameters
  })

  return next()
}

function maintenanceMiddleware(request, next) {
  const isOnMaintenance = process.env.maintenance_mode === "YES" ? true : false

  if (isOnMaintenance) {
    throw new GenericError({
      message: "Sorry for inconvenience but we're performing some maintenance at the moment. We'll be back shortly!",
      name: "System Maintenance",
      params: [
        {
          status: isOnMaintenance ? "DOWN" : "UP"
        }
      ],
      status: 503
    })
  }

  return next()
}
