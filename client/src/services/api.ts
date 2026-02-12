import axios from 'axios';
import { Bug } from '../types/Bug';

const API_URL = 'http://localhost:3001/api/bugs';

export const getbugs = async (status?: string, priority?: string): Promise<Bug[]> => {
  const params: any = {};
  if (status) params.status = status;
  if (priority) params.priority = priority;
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const getBug = async (id: number): Promise<Bug> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBug = async (data: { title: string; description?: string; priority?: string }): Promise<Bug> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateBug = async (id: number, data: Partial<Bug>): Promise<Bug> => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteBug = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};