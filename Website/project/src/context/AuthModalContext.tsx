import { createContext, useContext } from 'react';

type AuthModalContextValue = {
  openAuth: (mode: 'login' | 'register') => void;
};

export const AuthModalContext = createContext<AuthModalContextValue>({
  openAuth: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);
