import React, { createContext, useState, useContext, ReactNode } from 'react';
import { register as loginRegister, Role } from '@/Services/Authentication/AuthService';
import { FlowProvider } from '../FlowProvider/FlowProvider';

interface AuthTokens {
  idToken: string;
  accessToken: string;
}

interface AuthState {
  roles: string[];
  user: { username: string } | null;
  tokens: { [role: string]: AuthTokens };
}

interface AuthContextProps {
  authState: AuthState;
  login: (role: string, user: { username: string }, tokens: AuthTokens) => void;
  logout: (role: string) => void;
  register: ({role,username, password, email}: AuthRegisterParams) => void;
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
    user: null,
    tokens: {},
  });

  const { flowType, setFlowType } = useContext(FlowProvider)

  const register = async ({role,username, password, email}: AuthRegisterParams) => {

    const response = await loginRegister(username, password, email, role)
    console.log(response)
  }

  const login = (role: string, user: { username: string }, tokens: AuthTokens) => {
    setAuthState((prevState) => ({
      roles: Array.from(new Set([...prevState.roles, role])),
      user: user || prevState.user,
      tokens: { ...prevState.tokens, [role]: tokens },
    }));
  };

  const logout = (role: string) => {
    setAuthState((prevState) => {
      const updatedRoles = prevState.roles.filter((r) => r !== role);
      const { [role]: _, ...remainingTokens } = prevState.tokens;
      return {
        roles: updatedRoles,
        user: updatedRoles.length > 0 ? prevState.user : null,
        tokens: remainingTokens,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, register }}>
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
