import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { CognitoTokenResponse, getTokens, register as loginRegister, Role } from '@/Services/Authentication/AuthService';
import { FlowProvider } from '../FlowProvider/FlowProvider';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { ICognitoUserSessionData } from 'amazon-cognito-identity-js'


interface UserData {
  username: string
}

interface AuthState {
  roles: string[];
  users: Record<Role, UserData>;
  tokens: Record<Role, CognitoTokenResponse>; 
}

interface AuthContextProps {
  authState: AuthState;
  login: (role: Role, user: UserData, tokens: CognitoTokenResponse) => void;
  logout: (role: Role) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export type AuthRegisterParams = {
    role: Role
    username: string
    password: string
    email: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    roles: [],
    users: {} as Record<Role, UserData>,
    tokens: {} as Record<Role, CognitoTokenResponse>,
  });

  const {flowType} = useContext(FlowProvider)
  useEffect(()=>{
      if(flowType && flowType !== 'loading')
      getUserTokens(flowType)
  },[flowType])

  const getUserTokens = async (flowType: Role) => {
    try {
      const creds = await getTokens(flowType)
      setAuthState((prevState) => ({
        roles: Array.from(new Set([...prevState.roles, flowType])),
        users: {...prevState.users,[flowType]: creds?.username},
        tokens: { ...prevState.tokens, [flowType]: creds?.tokens },
      }));
    } catch (error) {
      console.log(error)
    }

  }


  const login = useCallback((role: string, user: UserData, tokens: CognitoTokenResponse) => {
    setAuthState((prevState) => ({
      roles: Array.from(new Set([...prevState.roles, role])),
      users: {...prevState.users,[role]: user},
      tokens: { ...prevState.tokens, [role]: tokens },
    }));
  },[]);

  const logout = useCallback((role: Role) => {
    setAuthState((prevState) => {
      const updatedRoles = prevState.roles.filter((r) => r !== role);
      const { [role]: _, ...remainingTokens } = prevState.tokens;
      const { [role]: _1, ...remainingUsers } = prevState.users; 

      return {
        roles: updatedRoles,
        users: remainingUsers as Record<Role, UserData>,
        tokens: remainingTokens as Record<Role, CognitoTokenResponse>,
      };
    });
  },[]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
