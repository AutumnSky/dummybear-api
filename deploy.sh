#!/bin/bash
tar --exclude='node_modules' --exclude='build' -cvf dummybear-api.tar ./
scp -i /Users/autumn/.ssh/aws_ec2_t2micro.pem dummybear-api.tar ec2-user@15.164.45.155:~
rm dummybear-api.tar

ssh -i /Users/autumn/.ssh/aws_ec2_t2micro.pem ec2-user@15.164.45.155 << 'ENDSSH'
pm2 stop dummybear-api
rm -rf dummybear-api
mkdir dummybear-api
tar -xvf dummybear-api.tar -C dummybear-api
rm dummybear-api.tar
cd dummybear-api
yarn install
yarn start
ENDSSH