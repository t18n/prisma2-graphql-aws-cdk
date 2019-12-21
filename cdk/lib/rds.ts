import { Construct, StackProps, SecretValue } from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import {
  Vpc,
  InstanceType,
  InstanceSize,
  InstanceClass,
  SubnetType,
  ISecurityGroup,
} from '@aws-cdk/aws-ec2';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import { RESOURCE_PREFIX } from '../constants';

interface IRds extends StackProps {
  vpc: Vpc;
  securityGroup: ISecurityGroup;
}

// Defines an AWS Lambda resource
export const Rds = (scope: Construct, props: IRds) => {
  const databasePassword = new Secret(scope, `${RESOURCE_PREFIX}DatabasePassword`, {
    description: 'Generated password for cdk database',
    generateSecretString: {
      passwordLength: 20,
      excludePunctuation: true,
    },
  });

  const databaseCluster = new rds.DatabaseCluster(scope, `${RESOURCE_PREFIX}DbCluster1`, {
    clusterIdentifier: `${RESOURCE_PREFIX}DbCluster1`,
    engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
    defaultDatabaseName: 'Graphql-apiDB',
    port: 3306,
    masterUser: {
      username: 'admin',
      password: SecretValue.plainText('bpBdhhQ6fy76QBGr96Hr'), // TODO: Change this
      // password: databasePassword.secretValue
    },
    instances: 3, // Create 3 instances
    instanceProps: {
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.SMALL),
      vpc: props.vpc,
      securityGroup: props.securityGroup,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
    },
    parameterGroup: new rds.ClusterParameterGroup(scope, `${RESOURCE_PREFIX}RdsParamsGroup`, {
      family: 'aurora-mysql5.7',
      description: `${RESOURCE_PREFIX} MySQL 5.7 parameter group`,
      parameters: {
        character_set_database: 'utf32',
      },
    }),
  });

  return {
    databasePassword,
    databaseCluster,
  };
};
