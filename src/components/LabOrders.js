import React, { useState, useEffect } from 'react';

const LabOrders = ({ patientId }) => {
  const [labOrders, setLabOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lab orders associated with the given patient ID
  useEffect(() => {
    const fetchLabOrders = async () => {
      try {
        setLoading(true);

        // Replace this with the actual API call once we get backend
        const response = await fetch(`/api/laborders?patient_id=${patientId}`);
        const data = await response.json();

        setLabOrders(data);
      } catch (error) {
        console.error("Error fetching lab orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabOrders();
  }, [patientId]);

  if (loading) {
    return <p>Loading lab orders...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lab Orders</h2>

      {labOrders.length === 0 ? (
        <p>No lab orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Doctor ID</th>
              <th>Order Time</th>
              <th>Test Desired</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Results</th>
            </tr>
          </thead>
          <tbody>
            {labOrders.map((order) => (
              <tr key={order.lab_order_id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{order.lab_order_id}</td>
                <td>{order.doctor_id}</td>
                <td>{new Date(order.order_time).toLocaleString()}</td>
                <td>{order.test_desired}</td>
                <td>{order.status}</td>
                <td>${order.cost.toFixed(2)}</td>
                <td>{order.results || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LabOrders;
