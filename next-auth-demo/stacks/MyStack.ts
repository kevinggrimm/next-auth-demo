import { StackContext, Api, NextjsSite, Table } from "@serverless-stack/resources";

export function MyStack({ stack, app }: StackContext) {
  
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
  });

  const nextAuthTable = new Table(stack, "NextAuthTable", {
    fields: {
      pk: "string",
      sk: "string",
      GSI1PK: "string",
      GSI1SK: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
    globalIndexes: {
      GSI1: {
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
      },
    },
  });

  const site = new NextjsSite(stack, "Site", {
    path: "frontend",
    defaults: {
      function: {
        memorySize: 2048,
        permissions: [nextAuthTable]
      },
    },
    environment: {
      NEXTAUTH_TABLE_NAME: nextAuthTable.tableName
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
    tableName: nextAuthTable.tableName
  });
}
