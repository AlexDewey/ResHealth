import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PatientDashboard from './components/PatientDashboard';
import Billing from './components/Billing';
import Medications from './components/Medications';
import LabOrders from './components/LabOrders';
import Navbar from './components/Navbar';
import DoctorDashboard from './components/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <div>

        <Navbar />
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home-patient" element={<PatientDashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/medications" element={<Medications />} />
          <Route path='/lab-orders' element={<LabOrders />} />
          <Route path='/home-doctor' element={<DoctorDashboard />} />
          <Route path="/home-admin" element={<AdminDashboard />} />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
