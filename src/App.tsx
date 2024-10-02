import React from 'react';
import './App.css';
import Metaballs from './components/Metaballs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Metaballs 
          size={400} 
          blobSize={150} 
          maxRadius={100} 
          blobCount={3}
        />
      </header>
    </div>
  );
}

export default App;
