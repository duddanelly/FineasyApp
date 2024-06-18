import React, { createContext, useState, ReactNode } from 'react';

interface TabBarContextProps {
  isTabBarVisible: boolean;
  setIsTabBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: TabBarContextProps = {
  isTabBarVisible: true,
  setIsTabBarVisible: () => {},
};

export const TabBarContext = createContext<TabBarContextProps>(defaultValue);

interface TabBarProviderProps {
  children: ReactNode;
}

export const TabBarProvider: React.FC<TabBarProviderProps> = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <TabBarContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabBarContext.Provider>
  );
};
