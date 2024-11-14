import React, { useState, useEffect } from 'react';

const DoctorDashboard = ({ doctorId }) => {
  const [medicationData, setMedicationData] = useState({
    patientId: '',
    medicationName: '',
    dosage: '',
    status: 'requested',
    cost: ''
  });
  const [labOrderData, setLabOrderData] = useState({
    patientId: '',
    testDesired: '',
    cost: ''
  });
  const [patientRequests, setPatientRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch outstanding patient requests for appointments
  useEffect(() => {
    const fetchPatientRequests = async () => {
      try {
        setLoading(true);
        // Replace with actual API endpoint
        const response = await fetch(`/api/patient_requests?doctor_id=${doctorId}&status=pending`);
        const data = await response.json();
        setPatientRequests(data);
      } catch (error) {
        console.error("Error fetching patient requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRequests();
  }, [doctorId]);

  // Handle input changes for medication form
  const handleMedicationChange = (e) => {
    setMedicationData({ ...medicationData, [e.target.name]: e.target.value });
  };

  // Handle input changes for lab order form
  const handleLabOrderChange = (e) => {
    setLabOrderData({ ...labOrderData, [e.target.name]: e.target.value });
  };

  const handlePrescribeMedication = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API endpoint
      await fetch(`/api/medications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...medicationData, doctorId })
      });
      alert("Medication prescribed successfully");
      setMedicationData({ patientId: '', medicationName: '', dosage: '', status: 'requested', cost: '' });
    } catch (error) {
      console.error("Error prescribing medication:", error);
    }
  };

  const handlePlaceLabOrder = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual API endpoint
      await fetch(`/api/laborders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...labOrderData, doctorId, status: 'ordered' })
      });
      alert("Lab order placed successfully");
      setLabOrderData({ patientId: '', testDesired: '', cost: '' });
    } catch (error) {
      console.error("Error placing lab order:", error);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      // Replace with actual API endpoint
      await fetch(`/api/patient_requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'confirmed' })
      });
      setPatientRequests(patientRequests.filter((req) => req.request_id !== requestId));
      alert("Patient request accepted");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Dashboard</h2>

      <h3>Prescribe Medication</h3>
      <form onSubmit={handlePrescribeMedication}>
        <input type="text" name="patientId" placeholder="Patient ID" value={medicationData.patientId} onChange={handleMedicationChange} required />
        <input type="text" name="medicationName" placeholder="Medication Name" value={medicationData.medicationName} onChange={handleMedicationChange} required />
        <input type="number" name="dosage" placeholder="Dosage" value={medicationData.dosage} onChange={handleMedicationChange} required />
        <input type="number" name="cost" placeholder="Cost" value={medicationData.cost} onChange={handleMedicationChange} required />
        <button type="submit">Prescribe Medication</button>
      </form>

      <h3>Place Lab Order</h3>
      <form onSubmit={handlePlaceLabOrder}>
        <input type="text" name="patientId" placeholder="Patient ID" value={labOrderData.patientId} onChange={handleLabOrderChange} required />
        <input type="text" name="testDesired" placeholder="Test Desired" value={labOrderData.testDesired} onChange={handleLabOrderChange} required />
        <input type="number" name="cost" placeholder="Cost" value={labOrderData.cost} onChange={handleLabOrderChange} required />
        <button type="submit">Place Lab Order</button>
      </form>

      <h3>Patient Appointment Requests</h3>
      {loading ? (
        <p>Loading patient requests...</p>
      ) : patientRequests.length === 0 ? (
        <p>No outstanding patient requests.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Patient ID</th>
              <th>Requested Time</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientRequests.map((request) => (
              <tr key={request.request_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{request.request_id}</td>
                <td>{request.patient_id}</td>
                <td>{new Date(request.requested_time).toLocaleDateString()}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>
                  <button onClick={() => handleAcceptRequest(request.request_id)}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorDashboard;
