// clientdata.js

import axios from 'axios';

const ClientList = async (tokenType, token) => {
//로그인 테스트api
  try {
    const response = await axios.get(
        'http://223.130.136.182:80/app/user/clients',
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${tokenType} ${token}`,
            }
        }
      );
      console.log('ClientList',response)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default ClientList;