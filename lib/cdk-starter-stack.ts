import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";

import { CfnOutput, Aws } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Role, ServicePrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  LambdaType,
  LambdaRole,
  handler,
  AWS_SDK,
  PUBLIC_LAMBDA_URL,
  PUBLIC_LAMBDA_PATH,
  PRIVATE_LAMBDA_PATH,
  FUN_LABEL,
  ARN_LABEL,
} from "./stackConfiguration";

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new Role(this, LambdaRole.NAME, {
      assumedBy: new ServicePrincipal(LambdaRole.SERVICE_PRINCIPAL),
    });

    role.addToPolicy(
      new PolicyStatement({
        resources: [
          `${ARN_LABEL}${Aws.REGION}:${Aws.ACCOUNT_ID}${FUN_LABEL}${LambdaType.PUBLIC_LAMBDA}`,
          `${ARN_LABEL}${Aws.REGION}:${Aws.ACCOUNT_ID}${FUN_LABEL}${LambdaType.PRIVATE_LAMBDA}`,
        ],
        actions: [LambdaRole.ACTIONS],
      })
    );

    /*** PRIVATE LAMBDA FUNCTION */
    const internalLambda = new NodejsFunction(this, LambdaType.PRIVATE_LAMBDA, {
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler,
      functionName: LambdaType.PRIVATE_LAMBDA,
      entry: path.join(__dirname, PRIVATE_LAMBDA_PATH),
      bundling: {
        minify: false,
        externalModules: [AWS_SDK],
      },
    });

    /*** PUBLIC LAMBDA FUNCTION */
    const publicLambda = new NodejsFunction(this, LambdaType.PUBLIC_LAMBDA, {
      memorySize: 1024,
      functionName: LambdaType.PUBLIC_LAMBDA,
      timeout: cdk.Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_16_X,
      handler,
      role,
      entry: path.join(__dirname, PUBLIC_LAMBDA_PATH),
      bundling: {
        minify: false,
        externalModules: [AWS_SDK],
      },
    });

    const fnUrl = publicLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, PUBLIC_LAMBDA_URL, {
      value: fnUrl.url,
    });
  }
}
