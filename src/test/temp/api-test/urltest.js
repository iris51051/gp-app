// DataFetchComponent.js

import axios from 'axios';

const authData = async () => {

  try {
    const response = await axios.post(
        'http://223.130.136.182:8080/auth/signin',
        {
          username: 'blues',
          password: 'Tmakxm123$'
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
    return response.data.token;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default authData;