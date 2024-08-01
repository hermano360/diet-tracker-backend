import { StackContext, Api, EventBus, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const table = new Table(stack, "BackendDietTracker", {
    primaryIndex: { partitionKey: "PK", sortKey: "SK" },
    fields: {
      PK: "string",
      SK: "string",
    },
  });

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus, table],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
      // user routes
      "POST /users/{userId}": "src/users/api.create",
      "GET /users": "src/users/api.query",
      // metrics routes
      "GET /metrics/{userId}": "src/metrics/api.query",
      "POST /metrics/{userId}": "src/metrics/api.create",
      "PUT /metrics/{userId}": "src/metrics/api.update",
      // macros routes
      "GET /macros/{userId}": "src/macros/api.query",
      "POST /macros/{userId}": "src/macros/api.create",
      "PUT /macros/{userId}": "src/macros/api.update",
      // notifications routes
      "GET /notifications/{userId}": "src/notifications/api.query",
      "POST /notifications/{userId}": "src/notifications/api.create",
      "PUT /notifications/{userId}": "src/notifications/api.update",
      // admin routes
      "GET /diary": "src/diary/api.query",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
