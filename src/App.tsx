import React, { useState } from 'react';
import './App.css';
import Metaballs from './components/Metaballs';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [metaballsSize, setMetaballsSize] = useState(100);
  const [blobSizePercent, setBlobSizePercent] = useState(15);
  const [speed, setSpeed] = useState(2);
  const [minSpeed, setMinSpeed] = useState(0.5);
  const [blobCount, setBlobCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const blobSize = Math.round((blobSizePercent / 100) * metaballsSize);

  return (
    <div className={`App ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="layout">
        <main>
          <div className="metaballs-container" style={{ width: metaballsSize, height: metaballsSize }}>
            <Metaballs
              size={metaballsSize}
              blobCount={blobCount}
              maxRadius={metaballsSize * 0.4}
              blobSize={blobSize}
              speed={speed}
              minSpeed={minSpeed}
              isDarkMode={isDarkMode}
              opacity={0.8}
            />
          </div>
        </main>
        <aside className="sidebar">
          <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? '−' : '+'}
          </button>
          <div className="sidebar-content">
            <h2>Controls</h2>
            <div className="control">
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="control">
              <label htmlFor="containerSize">Container Size: {metaballsSize}px</label>
              <input
                type="range"
                id="containerSize"
                min="50"
                max="300"
                value={metaballsSize}
                onChange={(e) => setMetaballsSize(Number(e.target.value))}
              />
            </div>
            <div className="control">
              <label htmlFor="blobCount">Number of Blobs: {blobCount}</label>
              <input
                type="range"
                id="blobCount"
                min="2"
                max="5"
                step="1"
                value={blobCount}
                onChange={(e) => setBlobCount(Number(e.target.value))}
              />
            </div>
            <div className="control">
              <label htmlFor="blobSize">Blob Size: {blobSize}px ({blobSizePercent}%)</label>
              <input
                type="range"
                id="blobSize"
                min="10"
                max="20"
                value={blobSizePercent}
                onChange={(e) => setBlobSizePercent(Number(e.target.value))}
              />
            </div>
            <div className="control">
              <label htmlFor="speed">Max Speed: {speed.toFixed(1)}</label>
              <input
                type="range"
                id="speed"
                min={minSpeed}
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
            <div className="control">
              <label htmlFor="minSpeed">Min Speed: {minSpeed.toFixed(1)}</label>
              <input
                type="range"
                id="minSpeed"
                min="0.1"
                max={speed}
                step="0.1"
                value={minSpeed}
                onChange={(e) => setMinSpeed(Number(e.target.value))}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
