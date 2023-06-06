
import { useQuery } from '@tanstack/react-query';
import { getBoard } from 'api/boards';

export const QK_BOARDS = 'QK_BOARDS';

export function useBoards(id: any) {
  const res = useQuery([QK_BOARDS, { id }], () => getBoard(id), {
    enabled: Boolean(id),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}