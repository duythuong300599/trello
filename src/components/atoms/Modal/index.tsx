import type { ModalProps } from 'antd';
import { Modal as ModalLib } from 'antd';
import React from 'react';

import Svg from '../Svg';
import styles from './modal.module.scss';

type Props = ModalProps & {
  children?: React.ReactNode | React.ReactNode[];
  titleModal?: string;
  icon?: any;
  iconWidth?: number;
  iconHeight?: number;
};

function Modal(props: Props) {
  return (
    <ModalLib closable {...props}>
      <div className={styles.titleWrapper}>
        {props?.icon && (
          <Svg
            className={styles.icon}
            src={props?.icon}
            alt="icon"
            width={props?.iconWidth || 24}
            height={props?.iconHeight || 24}
          />
        )}
        {props?.titleModal && (
          <h2 className={styles.title}>{props?.titleModal}</h2>
        )}
      </div>
      <div
        style={{
          marginLeft: props?.icon ? '36px' : '',
        }}
      >
        {props?.children}
      </div>
    </ModalLib>
  );
}
export const { confirm } = ModalLib;

export default Modal;
