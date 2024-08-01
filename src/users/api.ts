import { ApiHandler } from "sst/node/api";
import { Table } from "sst/node/table";
import { fetchAllUsers, getUserKeys } from "./utils";
import { queryPaginationRequests, saveSingleItem } from "../dynamo/utils";

export const create = ApiHandler(async (_evt) => {
  const userId = _evt.pathParameters?.userId;

  if (!userId) return;

  const params = {
    TableName: Table.BackendDietTracker.tableName,
    Item: {
      ...getUserKeys(userId),
      id: userId,
    },
  };

  try {
    await saveSingleItem(params);
    return {
      statusCode: 200,
      body: `User ${userId} has been created.`,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: `Something went wrong: ${err.message}`,
    };
  }
});

export const query = ApiHandler(async (_evt) => {
  const users = await fetchAllUsers();
  return {
    statusCode: 200,
    body: JSON.stringify({ users }),
  };
});
