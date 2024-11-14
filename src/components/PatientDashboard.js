import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Sample state to simulate previous appointments
  const [appointments, setAppointments] = useState([]);
  const [appointmentReason, setAppointmentReason] = useState('');

  // Fetch previous appointments (placeholder data)
  useEffect(() => {
    const fetchAppointments = async () => {
      // Replace with actual API call to fetch appointments
      const data = [
        { doctor_id: 'D001', time: '2024-11-20 10:00 AM', status: 'Confirmed', reason: 'Follow-up' },
        { doctor_id: 'D002', time: '2024-12-05 2:00 PM', status: 'Pending', reason: 'Routine Checkup' }
      ];
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  // Create appointment 
  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    const newAppointment = {
      doctor_id: 'D003', 
      time: new Date().toLocaleString(),
      status: 'Requested',
      reason: appointmentReason
    };

    // Replace with an API call to create the appointment
    setAppointments((prev) => [...prev, newAppointment]);
    setAppointmentReason('');
    alert('Appointment request sent!');
  };

  return (
    <div className="patient-dashboard" style={{ padding: '20px' }}>
      <h2>Patient Dashboard</h2>


      <section style={{ marginBottom: '20px' }}>
        <h3>Previous Appointments</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{appt.doctor_id}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>{appt.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


      <section style={{ marginBottom: '20px' }}>
        <h3>Request New Appointment</h3>
        <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <label>
            Reason:
            <input
              type="text"
              value={appointmentReason}
              onChange={(e) => setAppointmentReason(e.target.value)}
              required
              style={{ padding: '8px', margin: '8px 0' }}
            />
          </label>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Request Appointment
          </button>
        </form>
      </section>


      <section>
        <button
          onClick={() => navigate('/billing')}
          style={{ padding: '10px', margin: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Go to Billing Page
        </button>
        <button
          onClick={() => navigate('/medications')}
          style={{ padding: '10px', margin: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Go to Medications Page
        </button>
        <button
          onClick={() => navigate('/lab-orders')}
          style={{ padding: '10px', margin: '5px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Go to Lab Orders Page
        </button>
      </section>
    </div>
  );
};

export default PatientDashboard;
