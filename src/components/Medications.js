import React, { useState, useEffect } from 'react';

const Medications = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch medications associated with the given patient ID
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);

        // Replace this with the actual API call once we get
        const response = await fetch(`/api/medications?patient_id=${patientId}`);
        const data = await response.json();

        setMedications(data);
      } catch (error) {
        console.error("Error fetching medication records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [patientId]);

  if (loading) {
    return <p>Loading medication information...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Medications</h2>

      {medications.length === 0 ? (
        <p>No medications found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Medication ID</th>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Prescribing Doctor</th>
              <th>Prescription Date</th>
              <th>Status</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr key={medication.medication_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{medication.medication_id}</td>
                <td>{medication.medication_name}</td>
                <td>{medication.dosage} mg</td>
                <td>{medication.doctor_id}</td>
                <td>{new Date(medication.prescription_date).toLocaleDateString()}</td>
                <td>{medication.status}</td>
                <td>${medication.cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Medications;
