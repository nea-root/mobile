import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const victimPoolConfig : ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_ANSjwJvCM',
  ClientId: '368lddkptbolvmjc0s6vv725e2',
};

const volunteerPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_nvvAmwPxF',
  ClientId: '70shb2qu6tsaaq51d82pdajs1t',
};

const lawyerPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_rc0Wcp2J5',
  ClientId: '3gvul1477gqkjp4uha7r8svutb',
};

const therapistPoolConfig: ICognitoUserPoolData = {
  UserPoolId: 'us-east-1_bltGmzy7M',
  ClientId: '2egrs2v4lbgromehb6go6i7dat',
};

export const Pools = {
  victim: new CognitoUserPool(victimPoolConfig),
  volunteer: new CognitoUserPool(volunteerPoolConfig),
  lawyer: new CognitoUserPool(lawyerPoolConfig),
  therapist: new CognitoUserPool(therapistPoolConfig),
};
