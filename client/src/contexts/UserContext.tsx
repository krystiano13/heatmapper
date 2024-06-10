import { createContext, useState, useEffect } from "react";
import type { User } from "../types/user";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
} | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");

    if (refresh_token) {
      fetch("http://127.0.0.1:3000/users/tokens/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.resource_owner) {
            setUser({
              id: data.resource_owner.id,
              email: data.resource_owner.email,
              token: data.token,
              refresh_token: refresh_token,
            });
          }
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
