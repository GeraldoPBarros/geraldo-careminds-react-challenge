import React from 'react';
import { AuthProvider } from './useAuth';

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

