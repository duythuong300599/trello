import { useQuery } from '@tanstack/react-query';

import { getBoard, getListBoard } from '@/api/boards';

export const QK_LIST_BOARDS = 'QK_LIST_BOARDS';
export const QK_BOARDS = 'QK_BOARDS';

export function useListBoards() {
  const res = useQuery([QK_BOARDS], () => getListBoard(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return res;
}
export function useBoards(id: any) {
  const res = useQuery([QK_BOARDS, { id }], () => getBoard(id), {
    enabled: Boolean(id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return res;
}
