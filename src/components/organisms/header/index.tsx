import React from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/extensions
import iconArrowDown from '@/assets/images/arrowDown.svg';
// eslint-disable-next-line import/extensions
import iconMenu from '@/assets/images/menu.svg';
import Button from '@/components/atoms/Button';
import Svg from '@/components/atoms/Svg';
import { ROUTES } from '@/routes';

import styles from './index.module.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.headerWrapper}>
      <ul className={styles.itemLeft}>
        <li className={styles.menu}>
          <Svg src={iconMenu} />
        </li>
        <li className={styles.logo} onClick={() => navigate(ROUTES.Board)}>
          <div className={styles.img} />
        </li>
        <li className={styles.content}>
          <span className="d-flex align-center">
            Các không gian làm việc
            {'  '}
            <Svg
              className={styles.icon}
              src={iconArrowDown}
              width={16}
              height={16}
            />
          </span>
        </li>
        <li className={styles.content}>
          <span className="d-flex align-center">
            Gần đây
            {'  '}
            <Svg
              className={styles.icon}
              src={iconArrowDown}
              width={16}
              height={16}
            />
          </span>
        </li>
        <li className={styles.content}>
          <span className="d-flex align-center">
            Đã đánh dấu sao
            {'  '}
            <Svg
              className={styles.icon}
              src={iconArrowDown}
              width={16}
              height={16}
            />
          </span>
        </li>
        <li className={styles.content}>
          <span className="d-flex align-center">
            Mẫu
            {'  '}
            <Svg
              className={styles.icon}
              src={iconArrowDown}
              width={16}
              height={16}
            />
          </span>
        </li>
        <li>
          <Button className={styles.button}>Tạo Mới</Button>
        </li>
      </ul>
      <div className={styles.itemRight}></div>
    </header>
  );
}

export default Header;
