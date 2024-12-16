import { CognitoUser, AuthenticationDetails, CognitoUserPool, ICognitoUserPoolData, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as Keychain from 'react-native-keychain';
import { Pools } from './cognitoConfig';

interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export type Role = 'victim' | 'volunteer' | 'lawyer' | 'therapist';


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
          reject(error);
        }
      },
      onFailure: (err) => reject(err),
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

  return new Promise((resolve, reject) => {
    const userPool: CognitoUserPool = Pools[role];
    if (userPool.getCurrentUser()) {
      console.log(userPool.getCurrentUser())
      return
    }
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
          console.log(userPool)
          reject(err);
          return;
        }

        resolve(result);
      });
  });
};

/**
 * Retrieve stored tokens from Keychain.
 *
 * @returns A Promise resolving to the stored tokens or null.
 */
export const getTokens = async (role: Role): Promise<Tokens | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: role });
    if (credentials) {
      console.log(JSON.stringify(credentials))
      return JSON.parse(credentials.password) as Tokens;
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
