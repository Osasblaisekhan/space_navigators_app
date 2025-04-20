import { reserveRocket } from '../slice';

export const Storage = () => {
  localStorage.setItem('task', JSON.stringify(reserveRocket));
};

export const getTask = () => {
  const item = localStorage.getItem('task');
  return item ? JSON.parse(item) : [];
};
