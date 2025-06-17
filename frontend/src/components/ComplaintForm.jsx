import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/complaints', {
        title,
        description
      });
      alert('Complaint submitted');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Complaint</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
