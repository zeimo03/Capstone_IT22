import React from 'react';
import './Landing.css';
import { MdMenu, MdClose, MdSend } from 'react-icons/md'; // Added MdClose

const Landing = ({ sidebarOpen, onMenuClick, onCloseClick }) => {
  return (
    <div className="nav-bar">
      <div className="nav-brand">
        {/* Toggle icon switches dynamically based on sidebar state */}
        {sidebarOpen ? (
          <MdClose className='Menu CloseActive' onClick={onCloseClick} />
        ) : (
          <MdMenu className='Menu' onClick={onMenuClick} />
        )}
        <span>SANTA RITA COLLEGE OF PAMPANGA, INC.</span>
      </div>
      <div className="nav-message">
        <MdSend className='Send'/>
      </div>
    </div>
  );
}

export default Landing;