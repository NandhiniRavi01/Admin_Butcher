import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faEdit, faTrashAlt,faSearch, faBell, faEnvelope, faShoppingCart, faCog } from '@fortawesome/free-solid-svg-icons';

import '../css/dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    notifications: 2,
    messages: 2,
    cartItems: 2,
    settingsUpdates: 2,
  });

  const [adminData, setAdminData] = useState({
    name: '',
    profilePhoto: '',
  });

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://api.example.com/dashboard-data'); // Replace with your API URL
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await fetch('https://api.example.com/admin-data'); // Replace with your API URL
        const data = await response.json();
        setAdminData({
          name: data.name,
          profilePhoto: data.profilePhoto,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchDashboardData();
    fetchAdminData();
  }, []);

  return (
    <div className="dashboard">
     
      <main className="content">
        <header className="topbar">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search here"
              className="search-bar"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <div className="icons">
            <div className="icon-container">
              <FontAwesomeIcon icon={faBell} className="icon" />
              {dashboardData.notifications > 0 && (
                <span className="badge">{dashboardData.notifications}</span>
              )}
            </div>
            <div className="icon-container">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              {dashboardData.messages > 0 && (
                <span className="badge">{dashboardData.messages}</span>
              )}
            </div>
            <div className="icon-container">
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              {dashboardData.cartItems > 0 && (
                <span className="badge">{dashboardData.cartItems}</span>
              )}
            </div>
            <div className="icon-container">
              <FontAwesomeIcon icon={faCog} className="icon" />
              {dashboardData.settingsUpdates > 0 && (
                <span className="badge">{dashboardData.settingsUpdates}</span>
              )}
            </div>
          </div>
          <div className="profile">
            <p className='profile'>Hello, {adminData.name || 'Admin'}</p>
            <img
              src={adminData.profilePhoto || 'https://via.placeholder.com/40'}
              alt={adminData.name || 'Admin'}
              className="profile-pic"
            />
          </div>
          
        </header>
        
        
      </main>
    </div>
  );
};

export default Dashboard;

