import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const victimPoolConfig : ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_QJHCbnAJi',
  ClientId: '54eg0fp2msaudf8ho0ajndtcst',
};

const volunteerPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_8yrWUGhjK',
  ClientId: '2h2f5bim21jfgq5ns8lhjrvvo6',
};

const lawyerPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_k25cagoH7',
  ClientId: '1jrvumfj8pai24bd22dl3g4e5e',
};

const therapistPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_aMlwqA3QY',
  ClientId: '78f4c4u3b8s95cstre90hkf1g6',
};

export const Pools = {
  victim: new CognitoUserPool(victimPoolConfig),
  volunteer: new CognitoUserPool(volunteerPoolConfig),
  lawyer: new CognitoUserPool(lawyerPoolConfig),
  therapist: new CognitoUserPool(therapistPoolConfig),
};
