import { sendGet, sendPost } from "utils/axios";


export const getBoard =(id: string) =>  sendGet(`/v1/boards/${id}`);
export const addNewCard = (params: any) =>  sendPost('/v1/cards',params);