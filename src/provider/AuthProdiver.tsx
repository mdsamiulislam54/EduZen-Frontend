"use client";
import { JwtPayload } from "@/service/auth.service";
import { IUser } from "@/types/user.type";
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
  user: IUser;
}

interface AuthContextType {
  currentUser: JwtPayload;
  setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children, user }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(user)  

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};