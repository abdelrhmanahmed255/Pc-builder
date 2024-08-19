
import React, { useState } from 'react';
import Header from './components/Header';
import PCBuilder from './components/PCBuilder';

function App() {
  return (
    <div className="bg-[#0A1015] min-h-screen text-white">
      <Header />
      <PCBuilder />
    </div>
  );
}

export default App;