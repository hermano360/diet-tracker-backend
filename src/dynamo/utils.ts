import AWS from "aws-sdk";

export const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function saveSingleItem<Type>(
  params: AWS.DynamoDB.DocumentClient.PutItemInput
): Promise<undefined> {
  await dynamoDb.put(params).promise();
  return;
}

export async function queryPaginationRequests<Type>(
  params: AWS.DynamoDB.DocumentClient.QueryInput
): Promise<Type[]> {
  const itemsCollection: Type[] = [];

  let ExclusiveStartKey = undefined;
  let isItemsListEmpty = false;
  let isItemsListComplete = false;
  let result;

  do {
    result = await dynamoDb.query({ ...params, ExclusiveStartKey }).promise();
    const items: Type[] = result.Items as Type[];

    itemsCollection.push(...items);
    ExclusiveStartKey = result.LastEvaluatedKey;
    isItemsListEmpty = items.length === 0;
    isItemsListComplete = params.Limit ? items.length >= params.Limit : false;
  } while (ExclusiveStartKey && !isItemsListEmpty && !isItemsListComplete);

  return itemsCollection;
}
