import ContentBoard from "components/molecules/contentBoard"
import HeaderBoard from "components/molecules/headerBoard"

import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import { useBoards } from "hooks/useBoards";
import { Spin } from "antd";
import { BackGround } from "utils/constants";

function BoardContent() {

  const { id } = useParams();

  const { data: dataBoards, isLoading, isFetching, refetch } = useBoards(id)

  const backGround: 'backGround1' | 'backGround2' | 'backGround3' = dataBoards?.backGround;
  return (
    <Spin spinning={isFetching || isLoading}>
      <div
        className={styles.boardWrapper}
        style={{
          background: BackGround[backGround]
        }}
      >
        <HeaderBoard
          id={dataBoards?._id}
          title={dataBoards?.title}
        />
        <ContentBoard
          dataBoards={dataBoards}
          isFetching={isFetching}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </Spin>
  )
}

export default BoardContent