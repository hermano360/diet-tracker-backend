import { ApiHandler } from "sst/node/api";

export const query = ApiHandler(async (_evt) => {
  const userId = _evt.pathParameters?.userId;
  const pathDate = _evt.pathParameters?.date;

  if (!userId) return;

  const todaysDate = new Date().toISOString().split("T")[0];

  const date = pathDate || todaysDate;

  return {
    statusCode: 200,
    body: `User ${userId} results for ${date} are the following.`,
  };
});
