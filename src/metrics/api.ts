import { ApiHandler } from "sst/node/api";

export const create = ApiHandler(async (_evt) => {
  const userId = _evt.pathParameters?.userId;

  if (!userId) return;

  return {
    statusCode: 200,
    body: `User ${userId} metrics have been saved.`,
  };
});

export const query = ApiHandler(async (_evt) => {
  const userId = _evt.pathParameters?.userId;

  if (!userId) return;

  return {
    statusCode: 200,
    body: JSON.stringify({ userId }),
  };
});

export const update = ApiHandler(async (_evt) => {
  const userId = _evt.pathParameters?.userId;

  if (!userId) return;

  return {
    statusCode: 200,
    body: JSON.stringify({ userId }),
  };
});
