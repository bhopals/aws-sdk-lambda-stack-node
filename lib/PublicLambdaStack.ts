import { App, StackProps, Stack, Duration, CfnOutput } from "@aws-cdk/core";
import * as path from "path";

import {
  AssetCode,
  Function,
  FunctionUrlAuthType,
  Runtime,
} from "@aws-cdk/aws-lambda";

export class PublicLambdaStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const internalLambda = new Function(this, "internal-lambda", {
      memorySize: 1024,
      timeout: Duration.seconds(5),
      runtime: Runtime.NODEJS_16_X,
      handler: "lambda.handler",
      functionName: "internal-lambda",
      code: new AssetCode(
        path.join(__dirname, "/../src/lambda/internal-lambda")
      ),
    });

    const externalLambda = new Function(this, "external-lambda", {
      code: new AssetCode(
        path.join(__dirname, "/../src/lambda/external-lambda")
      ),
      functionName: "external-lambda",
      handler: "lambda.handler",
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(30),
      environment: {
        IS_PUBLIC: "true",
      },
    });

    const publicLambdaUrl = externalLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "publicLambdaUrl", {
      value: publicLambdaUrl.url,
    });
  }
}
