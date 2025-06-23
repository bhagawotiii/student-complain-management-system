import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Teacher');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/complaints', {
        title,
        description,
        category, // ✅ send category too
      });
      alert('Complaint submitted');
      setTitle('');
      setDescription('');
      setCategory('Teacher'); // reset category
    } catch (error) {
      console.error(error);
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Complaint</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      {/* ✅ Category dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="Teacher">Teacher</option>
        <option value="Academic">Academic</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
