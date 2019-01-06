import { lambdaWrapper } from "@serverless-guy/lambda"
import { errorHandler } from "@utils/errorHandler"
import { GenericError } from "@errors/GenericError"

export function httpWrapper(lambdaFunc, ...additionalMiddlewares) {
  return lambdaWrapper(
    lambdaFunc,
    errorHandler,
    logParams,
    maintenanceMiddleware,
    ...additionalMiddlewares
  )
}

function logParams(event, context) {
  console.log({
    body: event.body ? JSON.parse(event.body) : undefined,
    pathParams: event.pathParameters,
    queryString: event.queryStringParameters
  })
}

function maintenanceMiddleware(event, context) {
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
}
