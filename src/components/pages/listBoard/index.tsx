import { Popover, Spin } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteBoard } from '@/api/boards';
// eslint-disable-next-line import/extensions
import iconDel from '@/assets/images/DeleteOutlinedWhite.svg';
// eslint-disable-next-line import/extensions
import iconWarn from '@/assets/images/warning.svg';
import Modal from '@/components/atoms/Modal';
import Svg from '@/components/atoms/Svg';
import ModalAddBoard from '@/components/molecules/Modal/modalAddBoard';
import { useListBoards } from '@/hooks/useBoards';
import { ROUTES } from '@/routes';
import { BackGround, IBackground } from '@/utils/constants';

import styles from './index.module.scss';

function ListBoard() {
  type backgroundType = IBackground['value'];
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useListBoards();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [board, setBoard] = useState<any>();

  const handleDeleteBoard = async () => {
    try {
      const res = await deleteBoard(board._id);
      if (res.success) {
        refetch();
        setShowModalConfirm(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className={styles.wrapper}>
        {data?.map((boardDetail: any) => {
          const { backGround }: { backGround: backgroundType } = boardDetail;
          return (
            <div
              style={{
                background: BackGround[backGround],
              }}
              key={boardDetail._id}
              className={styles.boardCard}
              onClick={() => navigate(ROUTES.BoardDetail(boardDetail._id))}
            >
              <div className={styles.mask}>
                <Svg
                  className={styles.delete}
                  src={iconDel}
                  width={24}
                  height={24}
                  onClick={(e) => {
                    setShowModalConfirm(true);
                    setBoard(boardDetail);
                    e.stopPropagation();
                  }}
                />
              </div>
              <h2 className={styles.boardTitle}>{boardDetail.title}</h2>
            </div>
          );
        })}
        <Popover
          arrow={false}
          content={<ModalAddBoard />}
          placement="rightTop"
          trigger="click"
        >
          <div className={classNames(styles.boardCard, styles.createBoard)}>
            <h2 className={styles.title}>Create new board</h2>
          </div>
        </Popover>
      </div>
      {showModalConfirm && (
        <Modal
          width={360}
          centered
          open={showModalConfirm}
          titleModal={`Are you sure delete "${board.title}"?`}
          okText="Delete"
          okType="danger"
          icon={iconWarn}
          onOk={handleDeleteBoard}
          onCancel={() => setShowModalConfirm(false)}
          closable={false}
        />
      )}
    </Spin>
  );
}

export default ListBoard;
