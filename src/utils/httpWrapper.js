import { GenericError } from "@errors/generic.error";
import { wrapper } from "@serverless-guy/lambda";

export function httpWrapper(handlerFn) {
  const realHandler = wrapper(handlerFn);

  realHandler.pushMiddleware(logParams);
  realHandler.pushMiddleware(maintenanceMode);

  return realHandler;
}

function logParams(request, next) {
  const { event } = request;

  console.log({
    body: event.body ? JSON.parse(event.body) : undefined,
    pathParams: event.pathParameters,
    queryString: event.queryStringParameters
  });

  return next(request);
}

function maintenanceMode(request, next) {
  const isOnMaintenance = process.env.maintenance_mode === "YES" ? true : false;

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
  };

  return next(request);
}
