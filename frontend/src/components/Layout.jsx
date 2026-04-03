import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet /> 
      </main>

      <Sidebar />
    </div>
  );
};

export default Layout;