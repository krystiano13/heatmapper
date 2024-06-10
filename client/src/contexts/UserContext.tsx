import { createContext, useState, useEffect } from "react";
import type { User } from "../types/user";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
} | null>(null);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
