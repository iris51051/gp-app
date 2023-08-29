// viewdata.js

import axios from 'axios';

const viewList = async (tokenType, token) => {
//뷰 호출
  try {
    const response = await axios.get(
        'http://223.130.136.182:80/app/menu/view/1000',
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${tokenType} ${token}`,
            }
        }
      );
      console.log('viewList',response)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default viewList;