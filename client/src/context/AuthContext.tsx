import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, ReactNode } from "react";
import { AuthContextProps, AuthTokens } from "types";

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  let [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  let [user, setUser] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? jwtDecode(JSON.parse(storedTokens).access) : null;
  });

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const login = (tokenData: AuthTokens) => {
    setAuthTokens(tokenData);
    localStorage.setItem("authTokens", JSON.stringify(tokenData));
    setUser(jwtDecode(tokenData.access));
  };
  return (
    <AuthContext.Provider
      value={{
        authTokens,
        setAuthTokens,
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
