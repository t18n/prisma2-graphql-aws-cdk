import { LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway';
import { Construct } from '@aws-cdk/core';
import { RESOURCE_PREFIX } from '../constants';

export const Apigw = (scope: Construct, props: LambdaRestApiProps) => {
  const ApiGateway = new LambdaRestApi(scope, `${RESOURCE_PREFIX}ApiGw`, props);

  return {
    ApiGateway,
  };
};
