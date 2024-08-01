import { ApiHandler } from "sst/node/api";

export const query = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Trigger diary fetching for all users`,
  };
});
