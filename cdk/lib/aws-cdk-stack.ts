import { Stack, StackProps, Construct } from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { Lambda } from './lambda';
import { Apigw } from './apigw';
import { Rds } from './rds';
import { MainVpc } from './vpc';
import { Bastion } from './bastion';

export class AwsCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Defines a VPC
    const VpcApp = MainVpc(this);

    // Inititate Database
    const RdsApp = Rds(this, {
      vpc: VpcApp.vpc,
      securityGroup: VpcApp.securityGroup,
    });

    // Create Bastion to access Rds
    // Use EC2 Instance Connect `aws ec2-instance-connect send-ssh-public-key` to upload SSH public key.
    const BastionApp = Bastion(this, { vpc: VpcApp.vpc });

    // Create a lambda app
    const LambdaApp = Lambda(this, {
      vpc: VpcApp.vpc,
      rdsEndpoint: RdsApp.databaseCluster.clusterEndpoint.hostname,
      rdsPort: RdsApp.databaseCluster.clusterEndpoint.port,
      rdsDbUser: 'admin',
      rdsPassword: RdsApp.databasePassword.secretValue,
      rdsDb: 'Graphql-apiDB',
    });

    // Initiate API Gateway
    Apigw(this, {
      handler: LambdaApp.graphqlLambda,
    });
  }
}
