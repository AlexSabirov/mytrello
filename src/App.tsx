import React, { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';

const App: React.FC = () => {

  return (
    <div className="app">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default App;
