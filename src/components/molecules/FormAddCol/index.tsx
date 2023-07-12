import { Form } from 'antd';
import React, { useRef } from 'react';

// eslint-disable-next-line import/extensions
import iconPlus from '@/assets/images/plus.svg';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Svg from '@/components/atoms/Svg';

import styles from './index.module.scss';

interface Props {
  onClose?: () => void;
  onAddNewColumn?: (value: any) => void;
}

function FormAddCol(props: Props) {
  const { onClose, onAddNewColumn } = props;
  const [form] = Form.useForm();

  const inputRef = useRef<any>();

  const handleFinish = (value: any) => {
    if (!value.titleCol && inputRef.current) {
      inputRef.current.focus();
      return;
    }

    onAddNewColumn?.(value.titleCol);
    form.resetFields();
    onClose?.();
  };

  return (
    <Form form={form} onFinish={handleFinish} className={styles.form}>
      <Form.Item name="titleCol">
        <Input
          ref={inputRef}
          width={'100%'}
          autoFocus
          placeholder="Nhập tiêu đề danh sách"
        />
      </Form.Item>
      <div className={styles.btn}>
        <Button type="primary" htmlType="submit">
          Thêm danh sách
        </Button>
        <Svg
          onClick={onClose}
          className={styles.iconClose}
          src={iconPlus}
          alt="iconClose"
        />
      </div>
    </Form>
  );
}

export default FormAddCol;
