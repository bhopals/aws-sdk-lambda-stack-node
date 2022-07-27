export const UTF_8 = "utf-8";
export const AWS_SDK = "aws-sdk";
export const handler: string = "main";
export const region: string = "us-west-2";
export const appName: string = "t1-lambda-stack";

export const FUN_LABEL: string = ":function:";
export const ARN_LABEL: string = "arn:aws:lambda:";
export const INVOCATION_TYPE = "RequestResponse";

export const RDS_ARN = "AR:<>";

export const BASE_PATH: string = "/../src/lambda";
export const PUBLIC_LAMBDA_URL: string = "publicLambdaUrl";
export const GENERATOR_LAMBDA_URL: string = "genLambdaUrl";

export const PUBLIC_LAMBDA_PATH: string = `${BASE_PATH}/index.ts`;
export const GENERATOR_LAMBDA_PATH: string = `${BASE_PATH}/generateFn.ts`;
export const PRIVATE_LAMBDA_PATH: string = `${BASE_PATH}/internal.ts`;

export enum LambdaRole {
  NAME = "private-lambda-access-role",
  ACTIONS = "lambda:InvokeFunction",
  SERVICE_PRINCIPAL = "lambda.amazonaws.com",
}

export enum LambdaType {
  GENERATE_LAMBDA = "generate-lambda",
  PUBLIC_LAMBDA = "public-lambda",
  PRIVATE_LAMBDA = "private-lambda",
}

export const S3_BUCKET_NAME = "s3-bucket";
export const S3_BUCKET_ARN = "s3-bucket-arn";
export const S3_BUCKET_ID = `${appName}-app-details-bucket`;

export const S3_PRINCIPAL = "*";
export const S3_GET_OBJECT = "s3:GetObject";
export const S3_PUT_OBJECT = "s3:PutObject";
export const S3_DELETE_OBJECT = "s3:DeleteObject";

export const ROLE_ARN = "ROLE-ARN";
