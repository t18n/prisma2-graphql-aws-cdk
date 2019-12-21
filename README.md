# PRISMA 2 + Apollo 2 + GraphQL with AWS CDK

> If you would like to use this project only for testing purpose, rememember to run `cdk destroy --profile profile-name` to delete the stack afterwards to prevent any unexpected charge.
> This project is not fully optimized for production

## Prerequisites

- Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html)
- Install [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
- Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

## Getting started

1. Prepare

- Run `git clone git@github.com:turbothinh/prisma2-graphql-aws-cdk.git`
- Run one-liner command to install yarn `cd prisma2-graphql-aws-cdk && yarn && cd cdk yarn && cd ../`
- > Note: All `cdk` commands must be run inside `cdk` folder
- Install 2 AWS profiles with command `aws configure --profile <profile-name>`, profile name can be replaced as you wish, for e.g.
  - 1 programming profile has full IAM permission
  - 1 programming profile to be assigned to custom policy
- Create a local database and add connection string to `.env.development` file

1. Seed database

- Run `yarn env:dev && yarn db:migrate`
- Run `yarn db:seed:dev`
- Run `yarn generate:photon:dev`
- Run `yarn start:dev`
- Open `localhost:4000` on browser

## Deployment

- Run `yarn build:cdk`
- Go inside `cdk` folder and run `PROFILE=<your-configured-aws-profile> aws:cdk:deploy`
- Go to AWS Console -> CloudFormation to see deployed stack

## Removing stack

- Go inside `cdk` folder
- Run `cdk destroy --profile <your-configured-aws-profile>`
- > Note: AWS CloudFormation sometimes fails to delete resources as they are dependent on the others, I see it happens a lot with RDS and its Subnet. If this causes CloudFormation stack DELETE_FAIL status, try deleting it manually in AWS Console -> RDS -> Database

## Development;

1. Resources

   - [CDK Documentation](https://docs.aws.amazon.com/cdk/api/latest/typescript/api/index.html)
   - [CDK Examples](https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript)
   - [Prisma 2 Docs](https://github.com/prisma/prisma2/tree/master/docs)

2. Deploying to Lambda Function
   - [Generating correct Binaries for Photon](https://github.com/prisma/specs/blob/master/binaries/Readme.md#1-development-machine-is-mac-but-the-deployment-platform-is-aws-lambda)
     Create a file called `env.production` and add BINARY_TARGET='rhel-openssl-1.0.x' to build Photon for Lambda

3) Connect to Database Inside VPC using Bastion server

   - [Documentation](https://aws.amazon.com/de/blogs/compute/new-using-amazon-ec2-instance-connect-for-ssh-access-to-your-ec2-instances/)
   - Find instance id of your Bastian host: AWS Console -> EC2 -> Instances -> Instance ID
   - Prepare ssh public key locally
   - Locate region and availability zone of the Bastian host, then upload SSH key

     ```bash
     aws ec2-instance-connect send-ssh-public-key --region eu-west-2 --instance-id i-0d390c831797b24f2 --availability-zone eu-west-2a --instance-os-user <your-aws-profile> --ssh-public-key file://~/.ssh/id_rsa.pub --profile <your-aws-profile>
     ```

   - After uploading, you have 60s to connect to the Bastion via SSH. Find the Public DNS of the Bastion AWS Console -> EC2 -> Instances -> Publish DNS. Afterwards, use username `ec2-user` to connect via ssh.

     ```
     ssh ec2-user@<bastion-public-dns-address>
     ```

## Architecture

![Architecture diagram](https://raw.githubusercontent.com/turbothinh/prisma2-graphql-aws-cdk/master/static/Architecture.png)

Bastion is a great way to access resource inside VPC. I initially take that approach to access the database. However, I realized that it would add complexity and cost to the stack. Fortunately, AWS comes with Security Group, which allows you to define what IP can access your resource. I believe Security Group approach is way more handy and flexible. Therefore, feel free to remove the Bastion host from the stack. Remember to update your Database security group with your IP to enable access from host machine.
