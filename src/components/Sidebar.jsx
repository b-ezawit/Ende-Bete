import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Wind, Image, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: "/", icon: <Home size={24} />, label: "Home" },
    { path: "/today", icon: <Calendar size={24} />, label: "Today" },
    { path: "/comfort", icon: <Wind size={24} />, label: "Comfort" },
    { path: "/memories", icon: <Image size={24} />, label: "Memories" },
    { path: "/messages", icon: <MessageSquare size={24} />, label: "Messages" },
  ];

  return (
    <aside className="sidebar">
      {navItems.map((item) => (
        <NavLink 
          key={item.label} 
          to={item.path} 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <div className="nav-icon-box">{item.icon}</div>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;