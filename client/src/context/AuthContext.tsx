import { createContext, useContext, useState } from "react";
import {
  getCurrentUser,
  logoutUser,
  type User,
} from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(
    getCurrentUser()
  );

  const login = (user: User) => setUser(user);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("AuthProvider missing");
  return ctx;
};