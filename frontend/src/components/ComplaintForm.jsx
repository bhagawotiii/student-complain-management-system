import React, { useState } from 'react';
import { FaUser, FaMapMarkerAlt, FaClipboardList, FaFileAlt, FaUpload, FaPaperPlane } from 'react-icons/fa';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    category: '',
    details: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    
    // Update word count for details
    if (name === 'details') {
      setWordCount(value.split(/\s+/).filter(word => word.length > 0).length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Submission failed');
      alert('Complaint submitted successfully!');
      setForm({
        name: '',
        address: '',
        category: '',
        details: '',
        file: null,
      });
      setWordCount(0);
    } catch (err) {
      alert(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form className="complaint-form" onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <h2 style={styles.title}>📝 Submit Your Complaint</h2>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaUser style={styles.icon} /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your full name"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaMapMarkerAlt style={styles.icon} /> Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your address"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaClipboardList style={styles.icon} /> Category of Complaint
          </label>
          <select name="category" value={form.category} onChange={handleChange} required style={styles.select}>
            <option value="">Select Category</option>
            <option value="Teacher">👨‍🏫 Teacher Related</option>
            <option value="Academic">📚 Academic Issues</option>
            <option value="Other">🔧 Other</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaFileAlt style={styles.icon} /> Complaint Details
          </label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows={6}
            maxLength={2000}
            required
            style={styles.textarea}
            placeholder="Describe your complaint in detail (max 2000 words)"
          />
          <div style={styles.wordCount}>
            Words: {wordCount} / 2000
          </div>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FaUpload style={styles.icon} /> Supporting Documents (Optional)
          </label>
          <input 
            type="file" 
            name="file" 
            onChange={handleChange} 
            style={styles.fileInput}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <small style={styles.fileHelp}>
            Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </small>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading} 
          style={styles.submitButton}
        >
          {loading ? (
            <>
              <div style={styles.spinner}></div>
              Submitting...
            </>
          ) : (
            <>
              <FaPaperPlane style={styles.buttonIcon} />
              Submit Complaint
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: 'bold'
  },
  formGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#34495e',
    fontSize: '1rem'
  },
  icon: {
    marginRight: '8px',
    color: '#3498db'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease'
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e1e8ed',
    borderRadius: '8px',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  wordCount: {
    textAlign: 'right',
    fontSize: '0.9rem',
    color: '#7f8c8d',
    marginTop: '5px'
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    border: '2px dashed #bdc3c7',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer'
  },
  fileHelp: {
    display: 'block',
    marginTop: '5px',
    fontSize: '0.85rem',
    color: '#7f8c8d'
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    marginTop: '20px'
  },
  buttonIcon: {
    fontSize: '1rem'
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px'
  }
};

export default ComplaintForm;
