import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Use Routes instead of Switch
import Customer from "./Component/Customer";
import CustomerDetails from './Component/CustomerDetails';

function App() {
  return (
    <Router> {/* Wrapping the entire app in Router */}
     
      <div className="content">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Customer />} /> {/* Use element prop with JSX */}
          <Route path="/customer-details" element={<CustomerDetails />} />
          
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

