import BoardContent from "components/organisms/boardDetail";
import Home from "components/pages/home";
import ListBoard from "components/pages/listBoard";
import Auth from "wapper/Auth";


export const ROUTES = {
  Home: '/',
  Board: '/boards',
  BoardDetail: (id: number | string) => `/boards/${id}`,
}

const routes = [
  { exact: true, path: ROUTES.Home, component: Home, layout: Auth },
  { exact: true, path: ROUTES.Board, component: ListBoard, layout: Auth },
  { exact: true, path: ROUTES.BoardDetail(':id'), component: BoardContent, layout: Auth }
]

export default routes;