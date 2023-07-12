import { Form } from 'antd';
import React, { useState } from 'react';

import { updateColumn } from '@/api/boards';
import DropdownComponent from '@/components/atoms/DropdownComponent';
import Input from '@/components/atoms/Input';

import styles from './index.module.scss';

interface Props {
  title?: string;
  id: string;
  onDeleteColumn?: (id: string) => void;
}

function TitleEditInline(props: Props) {
  const { title, id, onDeleteColumn } = props;
  const [editTitle, setEditTitle] = useState(false);
  const [valueTitle, setValueTitle] = useState(title);

  const [form] = Form.useForm();

  const menuDropdown: any = [
    {
      key: '1',
      label: <div onClick={() => onDeleteColumn?.(id)}>Delete Column</div>,
    },
  ];

  const handleEditTitle = async (value: any) => {
    try {
      setEditTitle(false);
      if (value.title === title) return;
      setValueTitle(value.title);
      const payload = {
        title: value.title,
      };
      await updateColumn(id, payload);
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className={styles.titleWrapper}>
      {editTitle ? (
        <Form
          form={form}
          className={styles.form}
          onFinish={handleEditTitle}
          initialValues={{
            title: valueTitle,
          }}
        >
          <Form.Item name="title">
            <Input
              className={styles.input}
              value={valueTitle}
              autoFocus
              onBlur={(e) => handleEditTitle({ title: e.target.value })}
            />
          </Form.Item>
        </Form>
      ) : (
        <div className={styles.title} onClick={() => setEditTitle(true)}>
          {valueTitle}
        </div>
      )}
      <DropdownComponent menu={menuDropdown}>
        <div className={styles.dropdown}>...</div>
      </DropdownComponent>
    </div>
  );
}

export default TitleEditInline;
