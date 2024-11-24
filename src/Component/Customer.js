import React, { useState, useEffect } from "react";
import "../css/customer.css";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false); // To control the edit mode
  const [editData, setEditData] = useState({});
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };
  const [filter, setFilter] = useState("All"); // Selected filter
const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list

// Handle filter change
const handleFilterChange = (value) => {
  setFilter(value);
  if (value === "All") {
    setFilteredCustomers(customers);
  } else {
    const filtered = customers.filter((customer) => customer.location === value);
    setFilteredCustomers(filtered);
  }
};

// Update filtered customers when the component loads or `customers` data changes
useEffect(() => {
  // const fetchCustomers = async () => {
    //   try {
    //     const response = await fetch("https://your-api-endpoint.com/customers"); // Replace with your actual API endpoint
    //     const data = await response.json();
    //     setCustomers(data);
    //   } catch (error) {
    //     console.error("Error fetching customers:", error);
    //   }
    // };

  setFilteredCustomers(customers);
  // fetchCustomers();
}, [customers]);

  // Dummy customer data for testing
  const dummyCustomers = [
    { id: 1, name: "Randhir Kumar", location: "Savoychester", orders: 5, spent: "₹ 3500" },
    { id: 2, name: "Laxhman Singh", location: "Kaydenville", orders: 12, spent: "₹ 12000" },
    { id: 3, name: "Dinanath Sah", location: "East Frederation", orders: 6, spent: "₹ 1200" },
    { id: 4, name: "Armol Yadav", location: "South Marcella", orders: 3, spent: "₹ 1200" },
    { id: 5, name: "Raushan Singh Rajput", location: "South Oletstad", orders: 15, spent: "₹ 13000" },
    { id: 6, name: "Lokesh Rahul", location: "Densckberg", orders: 8, spent: "₹ 7200" },
    { id: 7, name: "Randhir Kumar", location: "Frameckview", orders: 4, spent: "₹ 2000" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Set how many customers per page you want to display

  useEffect(() => {
    setCustomers(dummyCustomers);
  }, []);

  // Pagination logic: calculate the customers to display based on the current page
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  // Handle checkbox selection
  const handleCheckboxChange = (e, customerId) => {
    if (e.target.checked) {
      setSelectedCustomers((prev) => [...prev, customerId]);
    } else {
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
    }
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(customers.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  // Enable editing mode when the Edit button is clicked
  const handleEdit = () => {
    if (selectedCustomers.length > 0) {
      setEditMode(true); // Enable editing mode
    } else {
      alert("Please select at least one customer to edit.");
    }
  };

  // Handle Rename button click (editing multiple selected customers)
  const handleRename = () => {
    const updatedCustomersData = customers.map((customer) => {
      if (selectedCustomers.includes(customer.id)) {
        return { ...customer, ...editData[customer.id] }; // Handle different edits for each customer
      }
      return customer;
    });

    setCustomers(updatedCustomersData);
    setEditMode(false); // Disable editing mode after renaming
    setSelectedCustomers([]); // Clear selection after rename
  };

  // Handle Delete button click
  const handleDelete = () => {
    const updatedCustomers = customers.filter(
      (customer) => !selectedCustomers.includes(customer.id)
    );
    setCustomers(updatedCustomers);
    setSelectedCustomers([]); // Clear selection after deletion
  };

  // Handle editing of customer data
  const handleEditChange = (e, customerId) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [customerId]: {
        ...prev[customerId],
        [name]: value,
      },
    }));
  };

  // Handle Previous and Next page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="container">
        <Sidebar />
        <main className="main">
          <header className="header">
           
          </header>

          <div>
            <Dashboard
              handleRename={handleRename}
              handleDelete={handleDelete}
              selectedCustomers={selectedCustomers}
            />
            <NavBar />
          </div>
          <div className="header">
            <h2>Customers</h2>
            <div className="buttons">
            <Link to="/export" className="tab">
              <button className="btn export">Export</button>
              </Link>
               <Link to="/add-customer" className="tab">
              <button className="btn add-customer">+ Add Customer</button>
              </Link>
            </div>
             </div>
            <br></br>
            <div className="tabs">
  		<Link to="/all-customers" className="tab">
   		 <button className="tab">All Customers</button>
  		</Link>
  		<Link to="/new-customers" className="tab">
   		 <button className="tab">New Customers</button>
  		</Link>
 		 <Link to="/returning-customers" className="tab">
 		   <button className="tab">Returning Customers</button>
 		 </Link>
	</div>
          <div className="same">
		<div className="filter-container">
  <label htmlFor="filter"></label>
  <select
    id="filter"
    className="filter-dropdown"
    onChange={(e) => handleFilterChange(e.target.value)}
  >
    <option value="All">Fliter</option>
    {Array.from(new Set(customers.map((customer) => customer.location))).map(
      (location) => (
        <option key={location} value={location}>
          {location}
        </option>
      )
    )}
  </select>
</div>

          <div className="actions">
            <div className="search-bar-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="Search here" className="search-bar" />
            </div>

            <div className="icons-font">
              <Link className="icon-btn" onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <Link className="icon-btn" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Link>
            </div>
          </div>
          </div>

          <table className="customer-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedCustomers.length === customers.length}
                  />
                </th>
                <th>Name</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Spent</th>
              </tr>
            </thead>
            <tbody>
            
             
              {currentCustomers.map((customer) => (
                <tr key={customer.id} data-id={customer.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={(e) => handleCheckboxChange(e, customer.id)}
                    />
                  </td>
                  <td>
                    {selectedCustomers.includes(customer.id) && editMode ? (
                      <input
                        type="text"
                        value={editData[customer.id]?.name || customer.name}
                        name="name"
                        onChange={(e) => handleEditChange(e, customer.id)}
                      />
                    ) : (
                     <div className="name-with-circle">
                      <span className="circle">{getInitial(customer.name)}</span>
                      {customer.name}
                    </div>
                      
                    )}
                  </td>
                  <td>
                    {selectedCustomers.includes(customer.id) && editMode ? (
                      <input
                        type="text"
                        value={editData[customer.id]?.location || customer.location}
                        name="location"
                        onChange={(e) => handleEditChange(e, customer.id)}
                      />
                    ) : (
                      customer.location
                    )}
                  </td>
                  <td>
                    {selectedCustomers.includes(customer.id) && editMode ? (
                      <input
                        type="number"
                        value={editData[customer.id]?.orders || customer.orders}
                        name="orders"
                        onChange={(e) => handleEditChange(e, customer.id)}
                      />
                    ) : (
                      customer.orders
                    )}
                  </td>
                  <td>
                    {selectedCustomers.includes(customer.id) && editMode ? (
                      <input
                        type="text"
                        value={editData[customer.id]?.spent || customer.spent}
                        name="spent"
                        onChange={(e) => handleEditChange(e, customer.id)}
                      />
                    ) : (
                      customer.spent
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
		
          <footer className="pagination-container">
  <Link
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className={`page-arrow ${currentPage === 1 ? "disabled" : ""}`}
  >
    ←
  </Link>

  <div className="page-numbers">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
        onClick={() => handlePageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>

  <Link
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={`page-arrow ${currentPage === totalPages ? "disabled" : ""}`}
  >
    →
  </Link>
</footer>

        </main>
      </div>
    </div>
  );
}

export default Customer;

