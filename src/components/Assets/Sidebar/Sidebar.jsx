import React from 'react';
import './Sidebar.css';
import { MdHome, MdCalendarMonth, MdLeaderboard } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { PiClipboardTextBold } from 'react-icons/pi';

const Sidebar = ({ isOpen, onOpen }) => {
  return (
    <div 
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onClick={!isOpen ? onOpen : undefined}
    >
      <div className="sidebar-profile">
        <FaUserCircle className="profile-icon" />
        {isOpen && <button className="login-btn">Log in</button>}
      </div>

      <nav className="sidebar-nav">
        <button className="sidebar-link">
          <MdHome className="nav-icon" />
          {isOpen && <span>Home</span>}
        </button>
        
        <button className="sidebar-link">
          <PiClipboardTextBold className="nav-icon" />
          {isOpen && <span>Registration</span>}
        </button>
        
        <button className="sidebar-link">
          <MdCalendarMonth className="nav-icon" />
          {isOpen && <span>Match Schedules</span>}
        </button>
        
        <button className="sidebar-link">
          <MdLeaderboard className="nav-icon" />
          {isOpen && <span>Ranking</span>}
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;