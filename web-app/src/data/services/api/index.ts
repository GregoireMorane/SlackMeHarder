import axios from 'axios';

// Channels

export const fetchChannels = async (): Promise<Channel[]> => {
  const response = await axios.get(`/api/channels`);
  const channels = response.data;

  return channels;
};

export const createChannel = async (name: string): Promise<void> => {
  await axios.post(`/api/channels`, {
    name,
  });
};

// Messages

export const fetchMessages = async (id: number): Promise<Message[]> => {
  const response = await axios.get(`/api/channels/${id}/messages`);
  const messages = response.data;

  return messages;
};

export const postMessages = async (content: string, channel_id: number): Promise<void> => {
  const data = { content, channel_id };
  await axios.post(`/api/messages`, data);
};

export const putMessage = async (message: any): Promise<void> => {
  await axios.put(`/api/messages/${message.id}`, {message});
}

// auth

export const signIn = async (username: string, password: string): Promise<void> => {
  const data = { username, password };
  await axios.post(`/api/auth/signin`, data);
};

export const signUp = async (username: string, password: string): Promise<void> => {
  const data = { username, password };
  await axios.post(`/api/auth/signup`, data);
};

export const whoAmI = async (): Promise<User> => {
  const response = await axios.get(`/api/whoami`);
  const user = response.data;

  return user;
};
