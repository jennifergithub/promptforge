import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext'; // Import the provider
import MainLayout from './views/MainLayout';
import ChooseYourChallenge from './views/ChooseYourChallenge';
import SecurePrompts from './views/SecurePrompts';
import { DefaultButton } from '@fluentui/react';
import OutputSafety from './views/OutputSafety';
import Guides from './views/Guides';
import { LevelsProvider } from './LevelsContext'; // Import LevelsProvider

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Routes */}
          <Route
          path="/"
          element={<LandingPage />} // Use a dedicated landing page component
          />
          
            <Route path="/choose-your-challenge" element={<ChooseYourChallenge />} />
            <Route path="/secure-prompts/:language" element={<SecurePrompts />} />
            <Route path="/output-safety/:language" element={<LevelsProvider><OutputSafety /></LevelsProvider>} />
            <Route path="/guides" element={<Guides />} />
        </Routes>
      </Router>
  </LanguageProvider>
  );
};

// Landing page without header
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/choose-your-challenge'); // Navigate to "Choose Your Challenge"
  };

  return (
    <div className="LandingPage">
      <h1>PromptForge</h1>
      <p>Code smarter, code safer with GPT.</p>
      <DefaultButton text="Begin" onClick={handleClick} />
    </div>
  );
};

export default App;