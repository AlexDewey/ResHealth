import React, { useState } from 'react';

function AppointmentForm({ onSubmit }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, reason });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <label>Reason:
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
      </label>
      <button type="submit">Schedule Appointment</button>
    </form>
  );
}

export default AppointmentForm;
