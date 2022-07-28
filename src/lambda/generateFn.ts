/* eslint-disable @typescript-eslint/require-await */
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Lambda } from "@aws-sdk/client-lambda";
import { TextDecoder, TextEncoder } from "util";
import {
  appName,
  LambdaType,
  INVOCATION_TYPE,
  UTF_8,
} from "../../lib/stackConfiguration";

export async function main(
  event: APIGatewayProxyEventV2,
  context: any
): Promise<APIGatewayProxyResultV2> {
  console.log(event);
  console.log(context);

  let response;
  try {
    const functionParams = {
      Code: {
        S3Bucket: process.env.bucketName,
        S3Key: process.env.bucketKey,
      },
      FunctionName: `${Date.now()}-lambda`,
      Handler: "test.handler",
      Role: process.env.roleArn,
      Runtime: "nodejs16.x",
      Timeout: 400,
    };
    console.log("functionParams>", functionParams);

    let result: any = { message: "Lambda Create Function" };
    const lambdaFnResponse = await new Lambda({}).createFunction(
      functionParams,
      (err: any, data: any) => {
        if (err) {
          result.err = err;
          console.log("err>", err);
        }
        result.success = data;
        console.log("data>", data);
      }
    );

    response = {
      body: JSON.stringify({
        data: result,
      }),
    };
    console.log("lambdaFnResponse>", lambdaFnResponse);
    console.log("AFter>createFunction>");
  } catch (error) {
    response = {
      body: JSON.stringify({
        error,
      }),
      statusCode: 500,
    };
  }

  console.log(response);

  return response;
}
