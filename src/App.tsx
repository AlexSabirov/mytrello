import React, { useState } from 'react';
import './App.css';
import { Boards } from './components/boards';

const App: React.FC = () => {

  return (
    <div className="app">
      <Boards />
      <Boards />
      <Boards />
      <Boards />
    </div>
  );
}

export default App;
