import axios from 'axios';

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.post(`/api/user/${userId}/change-password`, { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};