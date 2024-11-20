import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to use the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(''); // Default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};