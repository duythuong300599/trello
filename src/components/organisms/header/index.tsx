
import MenuIcon from 'assets/images/menu.svg';
import ArrowDown from 'assets/images/arrowDown.svg';

import styles from './index.module.scss';
import Svg from 'components/atoms/Svg';
import Button from 'components/atoms/Button';

function Header() {
  return (
    <header className={styles.headerWrapper}>
      <ul className={styles.itemLeft}>
        <li className={styles.menu}>
          <Svg src={MenuIcon} />
        </li>
        <li className={styles.logo}>
          <div className={styles.img} />
        </li>
        <li className={styles.content}>
          <span className='d-flex align-center'>
            Các không gian làm việc
            {'  '}
            <Svg className={styles.icon} src={ArrowDown} width={16} height={16} />
          </span>
        </li>
        <li className={styles.content}>
          <span className='d-flex align-center'>
            Gần đây
            {'  '}
            <Svg className={styles.icon} src={ArrowDown} width={16} height={16} />
          </span>
        </li>
        <li className={styles.content}>
          <span className='d-flex align-center'>
            Đã đánh dấu sao
            {'  '}
            <Svg className={styles.icon} src={ArrowDown} width={16} height={16} />
          </span>
        </li>
        <li className={styles.content}>
          <span className='d-flex align-center'>
            Mẫu
            {'  '}
            <Svg className={styles.icon} src={ArrowDown} width={16} height={16} />
          </span>
        </li>
        <li>
          <Button
            className={styles.button}
          >
            Tạo Mới
          </Button>
        </li>
      </ul>
      <div className={styles.itemRight}></div>
    </header>
  )
}

export default Header;