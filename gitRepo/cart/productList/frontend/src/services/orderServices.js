import axios from 'axios'
const API_URL =  'http://127.0.0.1:8000';

export const saveOrder = async(userId,cartItems,total)=>{
const response = await axios.post(`${API_URL}/orders`, {
  user_id: userId,
  items: cartItems,
  total: total
});
console.log(response.data,"RESPONSEDATA")
return response.data;
}
export async function getOrders(token) {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ include token in header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
}