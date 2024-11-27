import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Use Routes instead of Switch
import Customer from "./Component/Customer";
import CustomerDetails from './Component/CustomerDetails';
import DeliverPerson from "./Component/DesktopUser/DeliverPerson.js";
import OrderList from "./Component/DesktopUser/OrderList.js";
import NotifiactionDesktop from "./Component/DesktopUser/NotifiactionDesktop.js";
import Settings from "./Component/DesktopUser/Settings.js";

function App() {
  return (
    <Router> {/* Wrapping the entire app in Router */}
     
      <div className="content">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Customer />} /> {/* Use element prop with JSX */}
          <Route path="/customer-details" element={<CustomerDetails />} />
{/*Dharun*/}
            <Route path="/deliveryperson" element={<DeliverPerson/>} />
        <Route path="/notification" element={<NotifiactionDesktop/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/orderlist" element={<OrderList/>} />

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

