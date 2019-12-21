import { Construct, StackProps, SecretValue, Duration } from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { Vpc } from '@aws-cdk/aws-ec2';
import { RESOURCE_PREFIX } from '../constants';

interface IGraphqlApiLambda extends StackProps {
  vpc: Vpc;
  rdsEndpoint: string;
  rdsDbUser: string;
  rdsDb: string;
  rdsPort: number;
  rdsPassword: SecretValue;
}

// Defines an AWS Lambda resource
export const Lambda = (scope: Construct, props: IGraphqlApiLambda) => {
  const graphqlLambda = new lambda.Function(scope, `${RESOURCE_PREFIX}GraphqlLambda`, {
    description: `${RESOURCE_PREFIX}GraphqlLambda setting`,
    runtime: lambda.Runtime.NODEJS_12_X, // execution environment
    code: lambda.Code.asset('lambda/graphql-api'), // code loaded from the "lambda" directory
    handler: 'lambda.handler', // file is "graphql-api", function is "handler"
    vpc: props.vpc,
    timeout: Duration.seconds(10),
  });

  return {
    graphqlLambda,
  };
};
