import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to HealthDB</h1>
        <p>Your secure, decentralized healthcare database solution</p>
      </header>

      <div className="home-content">
        <h2>What We Do</h2>
        <p>
          HealthDB leverages blockchain technology to offer a decentralized, secure, and scalable database solution for healthcare institutions. Our platform allows hospitals, clinics, and healthcare providers to exchange data with full patient privacy and data integrity.
        </p>
        <div>
      <div style={{ marginBottom: '10px' }}>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
      <div>
        <Link to="/signup" className="btn btn-primary">
          Signup
        </Link>
      </div>
    </div>
      </div>
    </div>
  );
}

export default Home;
