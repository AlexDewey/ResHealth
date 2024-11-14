import React, { useState, useEffect } from 'react';

const Billing = ({ patientId }) => {
  const [billingRecords, setBillingRecords] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBillingRecords = async () => {
      try {
        setLoading(true);
        
        // Replace this with the actual API call
        const response = await fetch(`/api/billing?patient_id=${patientId}`);
        const data = await response.json();
        
        setBillingRecords(data);
      } catch (error) {
        console.error("Error fetching billing records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingRecords();
  }, [patientId]);

  if (loading) {
    return <p>Loading billing information...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Billing Information</h2>

      {billingRecords.length === 0 ? (
        <p>No billing records found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {billingRecords.map((record) => (
              <tr key={record.billing_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{record.billing_id}</td>
                <td>${record.cost.toFixed(2)}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Billing;
