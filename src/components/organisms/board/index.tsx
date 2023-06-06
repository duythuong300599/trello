import ContentBoard from "components/molecules/contentBoard"
import HeaderBoard from "components/molecules/headerBoard"

import styles from './index.module.scss';

function BoardContent() {
  return (
    <div className={styles.boardWrapper}>
      <HeaderBoard />
      <ContentBoard />
    </div>
  )
}

export default BoardContent