import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { env } from "./env";

const { region, accessKeyId, secretAccessKey } = env.aws;

const credentials = { accessKeyId, secretAccessKey };

export const dynamoDbClient = DynamoDBDocument.from(
    new DynamoDB({ credentials, region }),
    {
        marshallOptions: {
            convertEmptyValues: true,
            removeUndefinedValues: true,
            convertClassInstanceToMap: true,
        },
    },
);

