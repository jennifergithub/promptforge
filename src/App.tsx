import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MainLayout from './views/MainLayout';
import SecurePrompts from './views/SecurePrompts';
import { DefaultButton } from '@fluentui/react';
import OutputSafety from './views/OutputSafety';
import HowTo from './views/HowTo';
import { OutputLevelsProvider } from './OutputLevelsContext'; // Import LevelsProvider
import { SecurePromptLevelsProvider } from './SecurePromptLevelsContext';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          {/* Routes */}
          <Route
          path="/"
          element={<LandingPage />} // Use a dedicated landing page component
          />
            <Route path="/secure-prompts/" element={<SecurePromptLevelsProvider><SecurePrompts /></SecurePromptLevelsProvider>} />
            <Route path="/output-safety/" element={<OutputLevelsProvider><OutputSafety /></OutputLevelsProvider>} />
            <Route path="/how-to" element={<HowTo />} />
        </Routes>
      </Router>
  );
};

// Landing page without header
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/how-to/'); // Navigate to "How-To"
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