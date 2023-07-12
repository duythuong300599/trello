import { sendDelete, sendGet, sendPost, sendPut } from '@/utils/axios';

export const addNewBoard = (params: any) => sendPost('/v1/boards', params);
export const getBoard = (id: string) => sendGet(`/v1/boards/${id}`);
export const getListBoard = () => sendGet('/v1/boards');

export const updateBoard = (id: any, params: any) =>
  sendPut(`/v1/boards/${id}`, params);
export const deleteBoard = (id: string) => sendDelete(`/v1/boards/${id}`);

export const addNewColumn = (params: any) => sendPost('/v1/columns', params);
export const updateColumn = (id: any, params: any) =>
  sendPut(`/v1/columns/${id}`, params);
export const deleteColumn = (id: any) => sendDelete(`/v1/columns/${id}`);

export const addNewCard = (params: any) => sendPost('/v1/cards', params);
export const updateCard = (id: any, params: any) =>
  sendPut(`/v1/cards/${id}`, params);
