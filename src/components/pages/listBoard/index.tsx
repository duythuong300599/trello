import { useListBoards } from 'hooks/useBoards'
import styles from './index.module.scss'
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { BackGround } from 'utils/constants';

function ListBoard() {

  const navigate = useNavigate();
  const { data, isLoading } = useListBoards();


  return (
    <Spin spinning={isLoading} >
      <div className={styles.wrapper}>
        {data?.map((board: any) => {
          const backGround: 'backGround1' | 'backGround2' | 'backGround3' = board.backGround;
          return (
            <div
              style={{
                background: BackGround[backGround]
              }}
              key={board._id}
              className={styles.boardCard}
              onClick={() => navigate(ROUTES.BoardDetail(board._id))}
            >
              <h2 className={styles.boardTitle}>{board.title}</h2>
            </div>
          )
        })}
      </div>
    </Spin>
  )
}

export default ListBoard