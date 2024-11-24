import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css"; // Ensure your CSS is linked

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar when a link is clicked
  };

  return (
    <div>
      {/* Hamburger Icon for Mobile View */}
      <button className="hamburger" onClick={handleSidebarToggle}>
        <i className={isSidebarOpen ? "fas fa-times" : "fas fa-bars"}></i> {/* Toggle between bars and times icon */}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Bobby</h2>
        <p style={{ color: "grey" }}>Butcher Shop</p>

        <nav className={`nav ${isSidebarOpen ? "open" : ""}`}>
        <ul >
        <li>
        <Link to="/dashboard" className="sidebar-btn1 active" onClick={closeSidebar}>
          <i className="fas fa-home icon" style={{ marginRight: '10px',color:"green",padding: "15px 0" }}></i> Dashboard
          </Link>
        </li>
            <li>
              <Link to="/grade-list" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-list icon"></i> Order List
              </Link>
            </li>
            <li>
              <Link to="/order-detail" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-file-alt icon"></i> Order Detail
              </Link>
            </li>
            <li>
              <Link to="/customer" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-user icon"></i> Customer
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-pen icon"></i> Reviews
              </Link>
            </li>
            <li>
              <Link to="/meats" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-coffee icon"></i> Meats
              </Link>
            </li>
            <li>
              <Link to="/chat" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-comment icon"></i> Chat
              </Link>
            </li>
            <li>
              <Link to="/delivery-partner" className="sidebar-btn" onClick={closeSidebar}>
                <i className="fas fa-motorcycle icon"></i> Delivery Partner
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
