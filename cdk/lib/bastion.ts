import { Vpc, Peer, SubnetType } from '@aws-cdk/aws-ec2';
import { BastionHostLinux } from '@aws-cdk/aws-ec2';
import { Construct, StackProps } from '@aws-cdk/core';
import { RESOURCE_PREFIX } from '../constants';

interface IGraphqlApiBastion extends StackProps {
  vpc: Vpc;
}

// Create a bastion to access VPC via ssh
export const Bastion = (scope: Construct, props: IGraphqlApiBastion) => {
  const host = new BastionHostLinux(scope, `${RESOURCE_PREFIX}BastionHost`, {
    instanceName: `${RESOURCE_PREFIX}BastionHost`,
    vpc: props.vpc,
    subnetSelection: { subnetType: SubnetType.PUBLIC },
  });

  host.allowSshAccessFrom(Peer.ipv4('<your-computer-ip>/32'));

  return {
    host,
  };
};
