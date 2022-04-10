import { createContext, ReactElement, useState } from 'react';

interface IAuthContext {
  auth?: object;
  setAuth: Function;
}

const AuthContext = createContext<IAuthContext>({ setAuth: () => {} });

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
