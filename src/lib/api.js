import axios from 'axios';

export const getPost = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = await axios.get(url);
  return response.data;
};

export const getUsers = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await axios.get(url);
  return response.data;
};

export const getUser = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const response = await axios.get(url);
  return response.data;
};