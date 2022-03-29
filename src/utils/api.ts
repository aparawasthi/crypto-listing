import axios from 'axios';
import { CryptoCoin } from 'src/interface/CryptoCoin';

export async function getData(url: string, headers = {}) {
  console.log('API Requested');
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// const response = await axios.get(`${config.endpoint}/cart`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
