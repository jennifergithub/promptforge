import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import Nav from './Nav';

const MainLayout: React.FC = () => {

  return (
    <div>
      <div className="App-header">
        <h1>PromptForge</h1>
      </div>
      <Nav />
      <Outlet /> {/* Render nested routes */}
    </div>
  );
};

export default MainLayout;