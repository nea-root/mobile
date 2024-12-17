import { CognitoUser, AuthenticationDetails, CognitoUserPool, ICognitoUserPoolData, CognitoUserAttribute, ISignUpResult, CognitoUserSession, ICognitoUserSessionData, CognitoIdToken } from 'amazon-cognito-identity-js';
import * as Keychain from 'react-native-keychain';
import { Pools } from './cognitoConfig';

export interface CognitoTokenPayload {
  sub: string;
  email_verified?: boolean;
  iss: string;
  "cognito:username"?: string;
  origin_jti: string;
  aud?: string;
  event_id: string;
  token_use: string;
  auth_time: string;
  exp: string;
  iat: string;
  jti: string;
  email?: string;
  client_id?: string;
  scope?: string;
  username?: string;
}

export interface Token {
  jwtToken: string;
  payload: CognitoTokenPayload;
}

export interface CognitoTokenResponse {
  idToken: Token;
  refreshToken: {
    token: string;
  };
  accessToken: Token;
  clockDrift: string;
}


interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export type Role = 'victim' | 'volunteer' | 'lawyer' | 'therapist' | 'loading';


/**
 * Sign in a user to the appropriate Cognito pool based on role.
 *
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @param role - The role to determine the Cognito pool (e.g., 'victim', 'volunteer').
 * @returns A Promise resolving to an object containing tokens.
 */
export const signIn = async (
  username: string,
  password: string,
  role: Role
): Promise<{ tokens: CognitoTokenResponse, username: string }> => {
  if (role === 'loading') {
    return Promise.reject()
  }
  return new Promise((resolve, reject) => {
    const userPool: CognitoUserPool = Pools[role];
    if (!userPool) {
      reject(new Error('Invalid role'));
      return;
    }

    const user: CognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    user.authenticateUser(authDetails, {
      onSuccess: async (session) => {
        const serializedSession = JSON.stringify(session)
        try {
          // Store role and tokens securely in Keychain
          await Keychain.setGenericPassword(
            username,
            serializedSession,
            { service: role }
          );
          resolve({ tokens: JSON.parse(serializedSession), username: username });
        } catch (error) {
          console.log(error)
          reject(error);
        }
      },
      onFailure: (err) => { console.log(err); reject(err) },
    });
  });
};

/**
 * 
 * @param username 
 * @param password 
 * @param email 
 * @param role 
 * @returns 
 */
export const register = (username: string,
  password: string,
  email: string,
  role: Role) => {
  if (role === 'loading') {
    return Promise.reject()
  }
  return new Promise((resolve, reject) => {
    const userPool: CognitoUserPool = Pools[role];

    if (!userPool) {
      reject(new Error('Invalid role'));
      return;
    }
    var dataEmail = {
      Name: 'email',
      Value: email,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);


    const attributes: CognitoUserAttribute[] = [
      attributeEmail
    ];

    const validateAttributes: CognitoUserAttribute[] = [
    ]
    userPool.signUp(username,
      password, attributes, validateAttributes, ({ err, result }: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          username: username,
          password: password,
          email: email,
          role: role
        });
      });
  });
};

export const verifySignIn = async (
  username: string,
  verificationCode: string,
  role: Role
): Promise<any> => {
  if (role === 'loading') {
    return Promise.reject()
  }
  return new Promise((resolve, reject) => {
    const userPool: CognitoUserPool = Pools[role];
    if (!userPool) {
      reject(new Error('Invalid role'));
      return;
    }

    const user: CognitoUser = new CognitoUser({ Username: username, Pool: userPool });
    user.confirmRegistration(verificationCode, true, function (err, result) {
      if (err) {
        // alert(err.message || JSON.stringify(err));
        reject(new Error(err))
        return;
      }
      resolve(result)
      console.log('call result: ' + result);
    });
  });
};

/**
 * Retrieve stored tokens from Keychain.
 *
 * @returns A Promise resolving to the stored tokens or null.
 */
export const getTokens = async (role: Role): Promise<{ tokens: CognitoTokenResponse, username: string } | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: role });
    if (credentials) {
      return { tokens: JSON.parse(credentials.password), username: credentials.username };
    }
    return null;
  } catch (error) {
    throw new Error('Error fetching tokens from Keychain');
  }
};

/**
 * Sign out the current user by clearing tokens from Keychain.
 *
 * @returns A Promise that resolves when tokens are cleared.
 */
export const signOut = async (role: Role): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({ service: role });
  } catch (error) {
    throw new Error('Error clearing tokens');
  }
};
