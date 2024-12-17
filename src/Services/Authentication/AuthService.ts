import { CognitoUser, AuthenticationDetails, CognitoUserPool, ICognitoUserPoolData, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
import * as Keychain from 'react-native-keychain';
import { Pools } from './cognitoConfig';

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
): Promise<Tokens> => {
  if(role === 'loading'){
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
        console.log(session)
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        try {
          // Store role and tokens securely in Keychain
          await Keychain.setGenericPassword(
            username,
            JSON.stringify({ idToken, accessToken, refreshToken }),
            { service: role }
          );
          resolve({ idToken, accessToken, refreshToken, role });
        } catch (error) {
          console.log(error)
          reject(error);
        }
      },
      onFailure: (err) => {console.log(err);reject(err)},
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
    if(role === 'loading'){
      return Promise.reject()
    }
  return new Promise((resolve, reject) => {
    const userPool: CognitoUserPool = Pools[role];

    if (!userPool) {
      reject(new Error('Invalid role'));
      return;
    }
    console.log('hello')
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
          console.log(userPool)
          reject(err);
          return;
        }

        resolve({username: username,
          password: password,
          email: email,
          role: role});
      });
  });
};

export const verifySignIn = async (
  username: string,
  verificationCode: string,
  role: Role
): Promise<any> => {
  if(role === 'loading'){
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
        console.log('call result: ' + err);
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
export const getTokens = async (role: Role): Promise<{tokens:Tokens, username: string} | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: role });
    if (credentials) {
      console.log(JSON.stringify(credentials))
      return {tokens: JSON.parse(credentials.password), username: credentials.username };
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
