import { createContext } from 'react'
import type { User } from '../types/user'

type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {}
})
