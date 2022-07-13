/* eslint-disable @typescript-eslint/require-await */
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Lambda, LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { TextDecoder, TextEncoder } from "util";

export async function main(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  console.log("event 👉", event);
  let error;

  try {
    const lambdaClient = new Lambda({});
    const result = await lambdaClient.invoke({
      FunctionName: "internal-lambda",
      InvocationType: "RequestResponse",
      Payload: new TextEncoder().encode(
        JSON.stringify({ action: "do_something" })
      ),
    });

    const responseObject = JSON.parse(
      new TextDecoder("utf-8").decode(result.Payload) || "{}"
    );
    return {
      body: JSON.stringify({
        message: "Successful Public lambda invocation>>>",
        data: responseObject,
      }),
      statusCode: 200,
    };
  } catch (err) {
    error = err;
  }

  // try {
  //   const { Payload } = await client.invoke({
  //     FunctionName: "my-lamba",
  //     InvocationType: "RequestResponse",
  //     Payload: Buffer.from(JSON.stringify({ foo: "bar" })),
  //   });
  //   console.log(Payload);

  //   const asciiDecoder = new TextDecoder("ascii");
  //   const data = asciiDecoder.decode(Payload);
  //   console.log(data);
  //   return {
  //     body: JSON.stringify({
  //       message: "Successful Public lambda invocation>>>",
  //       data,
  //     }),
  //     statusCode: 200,
  //   };
  // } catch (error: any) {
  //   console.log(error);
  //   throw error;
  // }

  // client
  //   .invoke(params)
  //   .then((response) => {
  //     const response_data = JSON.parse(
  //       new TextDecoder("utf-8").decode(response.Payload)
  //     );
  //     console.log("response>>>>", response_data);
  //     return {
  //       body: JSON.stringify({
  //         message: "Successful Public lambda invocation>>>",
  //         response_data,
  //       }),
  //       statusCode: 200,
  //     };
  //   })
  //   .catch((err: any) => {
  //     console.error(err);
  //     error = err;
  //   });

  return {
    body: JSON.stringify({
      message: "error in calling private function",
      error,
    }),
    statusCode: 500,
  };
  // // async/await.
  // try {
  //   const data = await client.send(command);
  //   // process data.
  // } catch (error) {
  //   // error handling.
  // } finally {
  //   // finally.
  // }
}
