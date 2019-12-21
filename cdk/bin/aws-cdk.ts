#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsCdkStack } from '../lib/aws-cdk-stack';
import { RESOURCE_PREFIX } from '../constants';

const app = new cdk.App();

new AwsCdkStack(app, `${RESOURCE_PREFIX}Stack`, {
  env: {
    region: 'eu-west-2',
  },
});
