import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { CfnOutput } from "aws-cdk-lib";

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*** PRIVATE LAMBDA FUNCTION */
    const internalLambda = new NodejsFunction(this, "internal-lambda", {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "main",
      functionName: "internal-lambda",
      entry: path.join(__dirname, `/../src/lambda/internal.ts`),
      bundling: {
        minify: false,
        externalModules: ["aws-sdk"],
      },
    });

    /*** PUBLIC LAMBDA FUNCTION */
    const publicLambda = new NodejsFunction(this, "public-lambda", {
      memorySize: 1024,
      functionName: "public-lambda",
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "main",
      entry: path.join(__dirname, `/../src/lambda/index.ts`),
      bundling: {
        minify: false,
        externalModules: ["aws-sdk"],
      },
    });

    const fnUrl = publicLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "publicLambdaUrl", {
      value: fnUrl.url,
    });
  }
}
