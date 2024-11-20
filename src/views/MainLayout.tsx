import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import Nav from './Nav';
import { useLanguage } from '../LanguageContext';

const MainLayout: React.FC = () => {
  const { language } = useLanguage(); // Access the language from context

  return (
    <div>
      <div className="App-header">
        <h1>PromptForge</h1>
        <p>
          {language
            ? `You are working with ${language.toUpperCase()}`
            : 'Code smarter, code safer with GPT.'}
        </p>
      </div>
      <Nav />
      <Outlet /> {/* Render nested routes */}
    </div>
  );
};

export default MainLayout;