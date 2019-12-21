#!/usr/bin/env sh

# Clean the build
rm -rf cdk/lambda/graphql-api

# Compile typescript
tsc -p tsconfig.prod.json

# Generate photon
cp package.json cdk/lambda/graphql-api
cp .env.production cdk/lambda/graphql-api/.env
cp -r prisma cdk/lambda/graphql-api

# Install libraries and generate
cd cdk/lambda/graphql-api
yarn --prod
yarn generate

# Restructure deployment
mv src/* . # Move all files in src out
rm **/*.d.ts # remove type files
rm -rf src package.json yarn.lock # clean unnecessary files