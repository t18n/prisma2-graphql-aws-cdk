import { Construct } from '@aws-cdk/core';
import { Peer, Port, SecurityGroup, SubnetType, Vpc } from '@aws-cdk/aws-ec2';
import { RESOURCE_PREFIX } from '../constants';

// Defines an AWS Lambda resource
export const MainVpc = (scope: Construct) => {
  const vpc = new Vpc(scope, `${RESOURCE_PREFIX}Vpc`, {
    cidr: '10.0.0.0/16',
    // specifies the "subnet groups" to create
    // Every subnet group will have a subnet for each AZ
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: `${RESOURCE_PREFIX}Ingress`,
        subnetType: SubnetType.PUBLIC, // instead of Private to save NAT expense
      },
      {
        cidrMask: 28,
        name: `${RESOURCE_PREFIX}Database`,
        subnetType: SubnetType.ISOLATED,
      },
    ],
    natGateways: 0, // Define no NAT gateway
  });

  const securityGroup = new SecurityGroup(scope, `${RESOURCE_PREFIX}SecurityGroup`, {
    vpc: vpc, // block all outbound traffic by default
    allowAllOutbound: false,
    securityGroupName: `${RESOURCE_PREFIX}SecurityGroup`,
    description: `${RESOURCE_PREFIX} Define rules for securing VPC`,
  });

  // Traffic that can reach VPC
  securityGroup.addIngressRule(Peer.ipv4('<your-ip-address>/32'), Port.tcp(3306));
  securityGroup.addIngressRule(Peer.ipv4('10.0.0.0/16'), Port.tcp(3306));

  // Traffic that can leave VPC and where it goes
  securityGroup.addEgressRule(Peer.ipv4('<your-ip-address>/32'), Port.tcp(3306));

  return {
    vpc,
    securityGroup,
  };
};
