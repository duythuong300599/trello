import { useListBoards } from 'hooks/useBoards'
import styles from './index.module.scss'
import { Popover, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { BackGround } from 'utils/constants';
import classNames from 'classnames';
import ModalAddBoard from 'components/molecules/Modal/modalAddBoard';
import iconDel from 'assets/images/DeleteOutlinedWhite.svg'
import iconWarning from 'assets/images/warning.svg'
import Svg from 'components/atoms/Svg';
import { useState } from 'react';
import Modal from 'components/atoms/Modal';
import { deleteBoard } from 'api/boards';

function ListBoard() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useListBoards();
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [board, setBoard] = useState<any>()

  const handleDeleteBoard = async () => {
    try {
      const res = await deleteBoard(board._id);
      if (res.success) {
        refetch()
        setShowModalConfirm(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

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
              <div className={styles.mask}>
                <Svg
                  className={styles.delete}
                  src={iconDel}
                  width={24}
                  height={24}
                  onClick={(e) => {
                    setShowModalConfirm(true)
                    setBoard(board)
                    e.stopPropagation();
                  }}
                />
              </div>
              <h2 className={styles.boardTitle}>{board.title}</h2>
            </div>
          )
        })}
        <Popover
          arrow={false}
          content={<ModalAddBoard open />}
          placement='rightTop'
          trigger='click'
        >
          <div
            className={classNames(styles.boardCard, styles.createBoard)}
          >
            <h2 className={styles.title}>Create new board</h2>
          </div>
        </Popover>
      </div>
      {showModalConfirm &&
        <Modal
          width={360}
          centered
          open={showModalConfirm}
          titleModal={`Are you sure delete "${board.title}"?`}
          okText='Delete'
          okType='danger'
          icon={iconWarning}
          onOk={handleDeleteBoard}
          onCancel={() => setShowModalConfirm(false)}
          closable={false}
        />
      }
    </Spin>
  )
}

export default ListBoard