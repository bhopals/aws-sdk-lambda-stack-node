# Write TypeScript Lambda functions in AWS CDK - Complete Guide

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. ONE TIME ONLY - if it is the First time, then bootstrap the repository (Only run this the very first time, SKIP after that)

```bash
npx aws-cdk bootstrap
```

5. CDk Synth

```bash
cdk synth
```

6. Create the CDK stack

```bash
cdk deploy
```

7. Open the AWS Console and the stack should be created in your default region

8. Cleanup

```bash
cdk destroy
```

npx aws-cdk deploy --no-previous-parameters
