import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

const AccountContext = createContext(null);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  const [accountId, setAccountId] = useState<string>(value);

  useEffect(() => {
    
  }, [accountId]);
};
