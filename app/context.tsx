import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type User = {
  id: string;
  full_name: string;
  logout: boolean;
  create_at: Date;
  logout_at: null | Date;
};

const UserContext = createContext<User | undefined>(undefined);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
