import { sendDelete, sendGet, sendPost, sendPut } from "utils/axios";


export const getBoard =(id: string) =>  sendGet(`/v1/boards/${id}`);
export const getListBoard =() =>  sendGet('/v1/boards');

export const updateBoard = (id:any, params: any) =>  sendPut(`/v1/boards/${id}`,params);

export const addNewCard = (params: any) =>  sendPost('/v1/cards',params);
export const addNewColumn = (params: any) =>  sendPost('/v1/columns',params);
export const updateColumn = (id:any, params: any) =>  sendPut(`/v1/columns/${id}`,params);
export const deleteColumn = (id:any) =>  sendDelete(`/v1/columns/${id}`);