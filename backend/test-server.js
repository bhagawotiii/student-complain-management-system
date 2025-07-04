const axios = require('axios');

async function testServer() {
  try {
    console.log('Testing server connection...');
    const response = await axios.get('http://localhost:5000/');
    console.log('Server response:', response.data);
    
    console.log('\nTesting login endpoint...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      username: 'testuser',
      password: 'testpass',
      role: 'student'
    });
    console.log('Login response:', loginResponse.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testServer(); 