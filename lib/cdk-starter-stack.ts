import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";

import { CfnOutput, Aws } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  Role,
  ServicePrincipal,
  PolicyStatement,
  Effect,
  AnyPrincipal,
  ManagedPolicy,
} from "aws-cdk-lib/aws-iam";

import {
  LambdaType,
  LambdaRole,
  handler,
  appName,
  AWS_SDK,
  PUBLIC_LAMBDA_URL,
  PUBLIC_LAMBDA_PATH,
  PRIVATE_LAMBDA_PATH,
  FUN_LABEL,
  ARN_LABEL,
  S3_BUCKET_ID,
  S3_PRINCIPAL,
  S3_PUT_OBJECT,
  S3_DELETE_OBJECT,
  S3_GET_OBJECT,
  GENERATOR_LAMBDA_URL,
  GENERATOR_LAMBDA_PATH,
  ROLE_ARN,
} from "./stackConfiguration";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const fs = require("fs");
const admZip = require("adm-zip");

const file = new admZip();

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*** CREATE S3 BUCKET */
    const codeName = "test.zip";
    this.createLambdaZIPFile();
    const bucket = this.createS3Bucket();
    this.uploadLambdaInBucket(bucket.bucketName, codeName);

    /**** ROLE */
    const role = this.createRole(false);

    /*** PRIVATE LAMBDA FUNCTION */
    const privateLambda = new NodejsFunction(
      this,
      `${appName}-${LambdaType.PRIVATE_LAMBDA}`,
      {
        memorySize: 1024,
        timeout: cdk.Duration.seconds(500),
        runtime: lambda.Runtime.NODEJS_16_X,
        handler,
        role,
        functionName: `${appName}-${LambdaType.PRIVATE_LAMBDA}`,
        entry: path.join(__dirname, PRIVATE_LAMBDA_PATH),
        bundling: {
          minify: false,
          externalModules: [AWS_SDK],
        },
      }
    );

    /*** PUBLIC LAMBDA FUNCTION */
    const publicLambda = new NodejsFunction(
      this,
      `${appName}-${LambdaType.PUBLIC_LAMBDA}`,
      {
        memorySize: 1024,
        functionName: `${appName}-${LambdaType.PUBLIC_LAMBDA}`,
        timeout: cdk.Duration.seconds(500),
        runtime: lambda.Runtime.NODEJS_16_X,
        handler,
        role,
        entry: path.join(__dirname, PUBLIC_LAMBDA_PATH),
        bundling: {
          minify: false,
          externalModules: [AWS_SDK],
        },
        environment: {
          bucketName: bucket.bucketName,
          bucketArn: bucket.bucketArn,
          roleArn: role.roleArn,
          bucketKey: codeName,
        },
      }
    );

    /*** FUNCTION CREATOR LAMBDA */
    const fnCreatorLambda = new NodejsFunction(
      this,
      `${appName}-${LambdaType.GENERATE_LAMBDA}`,
      {
        memorySize: 1024,
        functionName: `${appName}-${LambdaType.GENERATE_LAMBDA}`,
        timeout: cdk.Duration.seconds(500),
        runtime: lambda.Runtime.NODEJS_16_X,
        handler,
        role: this.createRole(true),
        entry: path.join(__dirname, GENERATOR_LAMBDA_PATH),
        bundling: {
          minify: false,
          externalModules: [AWS_SDK],
        },
        environment: {
          bucketName: bucket.bucketName,
          bucketArn: bucket.bucketArn,
          roleArn: role.roleArn,
          bucketKey: codeName,
        },
      }
    );

    const fnUrl = publicLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const fnCreatorUrl = fnCreatorLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, PUBLIC_LAMBDA_URL, {
      value: fnUrl.url,
    });

    new CfnOutput(this, GENERATOR_LAMBDA_URL, {
      value: fnCreatorUrl.url,
    });

    new CfnOutput(this, ROLE_ARN, {
      value: role.roleArn,
    });
  }

  private createS3Bucket() {
    const bucket = new Bucket(this, S3_BUCKET_ID, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    bucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        principals: [new AnyPrincipal()],
        actions: [S3_GET_OBJECT, S3_DELETE_OBJECT, S3_PUT_OBJECT],
        resources: [`${bucket.bucketArn}/${S3_PRINCIPAL}`],
      })
    );
    return bucket;
  }

  private async uploadLambdaInBucket(bucketName: string, codeName: string) {
    const client = new S3Client({});
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: codeName,
      Body: fs.createReadStream(`./${codeName}`),
    });

    try {
      const s3PutResponse = await client.send(putCommand);
      console.log("S3 PUT Response: " + s3PutResponse);
    } catch (err) {
      console.log("ERROR in uploading the lambda");
    }
  }

  private createLambdaZIPFile() {
    file.addFile(
      "test.js",
      Buffer.from(`
        exports.handler = async function(event, context) {
          return { statusCode: 200, body: 'Hello, World!!!!' };
        };
      `)
    );
    file.writeZip("./test.zip");
  }

  private createRole(isGenerator: boolean) {
    /**** ROLE */
    const role = new Role(
      this,
      isGenerator
        ? `${appName}-${LambdaRole.NAME}-full`
        : `${appName}-${LambdaRole.NAME}`,
      {
        assumedBy: new ServicePrincipal(LambdaRole.SERVICE_PRINCIPAL),
      }
    );

    role.addToPolicy(
      new PolicyStatement({
        resources: isGenerator
          ? [
              `${ARN_LABEL}${Aws.REGION}:${Aws.ACCOUNT_ID}${FUN_LABEL}${appName}-${LambdaType.GENERATE_LAMBDA}`,
            ]
          : [
              `${ARN_LABEL}${Aws.REGION}:${Aws.ACCOUNT_ID}${FUN_LABEL}${appName}-${LambdaType.PUBLIC_LAMBDA}`,
              `${ARN_LABEL}${Aws.REGION}:${Aws.ACCOUNT_ID}${FUN_LABEL}${appName}-${LambdaType.PRIVATE_LAMBDA}`,
            ],
        actions: isGenerator ? ["lambda:*"] : [LambdaRole.ACTIONS],
      })
    );

    if (isGenerator) {
      role.addManagedPolicy(
        ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess")
      );
      role.addManagedPolicy(
        ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")
      );
    }

    return role;
  }
}
