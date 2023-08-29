// DataFetchComponent.js

import axios from 'axios';

const authData = async () => {
//로그인 테스트api
  try {
    const response = await axios.post(
        'http://223.130.136.182:80/auth/signin',
        {
          username: 'blues',
          password: 'Tmakxm123$'
        },
        // {
        //   "username" : "asj",
        //   "password": "Tmakxm0)"
        // },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log('reponse',response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default authData;