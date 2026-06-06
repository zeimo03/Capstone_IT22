import { useState } from 'react';
import './App.css';
import Landing from './components/Assets/Landing/Landing';
import Sidebar from './components/Assets/Sidebar/Sidebar';
import Hero from './components/Assets/Hero/Hero'; // Import the new layout component

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Landing 
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)} 
        onCloseClick={() => setSidebarOpen(false)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onOpen={() => setSidebarOpen(true)} 
      />
      
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
      
      {/* Component layout injects here directly inside main dashboard space */}
      <div className={`main-content ${sidebarOpen ? 'blurred' : ''}`}>
        <Hero />
      </div>
    </div>
  );
}

export default App;