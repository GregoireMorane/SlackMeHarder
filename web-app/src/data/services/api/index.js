import axios from 'axios';

export const fetchChannels = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/channels`
  );
  const channels = response.data;
  return channels;
};
