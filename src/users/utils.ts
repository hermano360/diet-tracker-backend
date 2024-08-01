import { Table } from "sst/node/table";
import { queryPaginationRequests } from "../dynamo/utils";

export const getUserKeys = (userId?: string): DatabaseKey => {
  return {
    PK: "users",
    SK: userId,
  };
};

export const fetchAllUsers = async (): Promise<string[]> => {
  const { PK } = getUserKeys();
  const params = {
    TableName: Table.BackendDietTracker.tableName,
    KeyConditionExpression: `PK = :PK`,
    ExpressionAttributeValues: {
      ":PK": PK,
    },
    Select: "SPECIFIC_ATTRIBUTES",
    ProjectionExpression: "id",
  };

  const users = await queryPaginationRequests<{ id: string }>(params);

  return users.map(({ id }) => id);
};
