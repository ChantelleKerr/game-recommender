import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, ReactNode } from "react";
import { AuthContextProps } from "types";

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log("HELLO");
  let [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  let [user, setUser] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? jwtDecode(JSON.parse(storedTokens).access) : null;
  });

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
