import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [admissionData, setAdmissionData] = useState({
    patientId: '',
    admitTime: '',
    doctorId: '',
    status: 'admitted'
  });
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all admissions
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        setLoading(true);
        // Replace with actual API endpoint
        const response = await fetch('/api/admissions');
        const data = await response.json();
        setAdmissions(data);
      } catch (error) {
        console.error("Error fetching admissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const handleAdmissionChange = (e) => {
    setAdmissionData({ ...admissionData, [e.target.name]: e.target.value });
  };

  // Submit admission form
  const handleAdmitPatient = async (e) => {
    e.preventDefault();
    try {
      // Replace laterrrrrrr google cloud why
      await fetch(`/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: admissionData.patientId,
          admittime: admissionData.admitTime,
          doctor_id: admissionData.doctorId,
          status: admissionData.status
        })
      });
      alert("Patient admitted successfully");
      setAdmissionData({ patientId: '', admitTime: '', doctorId: '', status: 'admitted' });
      // Refresh admissions list after adding a new admission
      const response = await fetch('/api/admissions');
      const data = await response.json();
      setAdmissions(data);
    } catch (error) {
      console.error("Error admitting patient:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>


      <h3>Admit Patient</h3>
      <form onSubmit={handleAdmitPatient}>
        <input
          type="text"
          name="patientId"
          placeholder="Patient ID"
          value={admissionData.patientId}
          onChange={handleAdmissionChange}
          required
        />
        <input
          type="datetime-local"
          name="admitTime"
          placeholder="Admission Time"
          value={admissionData.admitTime}
          onChange={handleAdmissionChange}
          required
        />
        <input
          type="text"
          name="doctorId"
          placeholder="Doctor ID"
          value={admissionData.doctorId}
          onChange={handleAdmissionChange}
          required
        />
        <select name="status" value={admissionData.status} onChange={handleAdmissionChange} required>
          <option value="admitted">Admitted</option>
          <option value="discharged">Discharged</option>
        </select>
        <button type="submit">Admit Patient</button>
      </form>


      <h3>Admissions</h3>
      {loading ? (
        <p>Loading admissions...</p>
      ) : admissions.length === 0 ? (
        <p>No admissions found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Admission ID</th>
              <th>Patient ID</th>
              <th>Admission Time</th>
              <th>Doctor ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission.admission_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{admission.admission_id}</td>
                <td>{admission.patient_id}</td>
                <td>{new Date(admission.admittime).toLocaleString()}</td>
                <td>{admission.doctor_id}</td>
                <td>{admission.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
