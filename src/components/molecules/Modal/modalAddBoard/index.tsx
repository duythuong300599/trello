import { Form } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addNewBoard } from '@/api/boards';
// eslint-disable-next-line import/extensions
import iconCheck from '@/assets/images/check.svg';
// eslint-disable-next-line import/extensions
import skeleton from '@/assets/images/skeletonBoard.svg';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Svg from '@/components/atoms/Svg';
import { ROUTES } from '@/routes';
import { BackGround, IBackground } from '@/utils/constants';

import styles from './index.module.scss';

function ModalAddBoard() {
  type backgroundType = IBackground['value'];

  const [bgSelected, setBgSelected] = useState<backgroundType>('backGround1');
  const [disableButton, setDisableButton] = useState(true);
  const inputRef = useRef<HTMLInputElement>();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const listBackground = Object.keys(BackGround);

  const handleValuesChange = (value: any) => {
    if (value.title.length >= 3) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const handleFinish = async (value: any) => {
    try {
      const data = await form.validateFields(value);
      const formData = {
        title: data.title,
        backGround: bgSelected,
      };

      const res = await addNewBoard(formData);
      if (res) {
        navigate(ROUTES.BoardDetail(res._id));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className={styles.modalAddBoard}>
      <header className={styles.header}>Create board</header>
      <div className={styles.preview}>
        <div
          className={styles.item}
          style={{
            background: BackGround[bgSelected],
          }}
        >
          <div className={styles.skeleton}>
            <Svg src={skeleton} alt="skeleton" />
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <h3>Background</h3>
        <ul className={styles.listBackground}>
          {listBackground.map((bg: any, i: number) => {
            const data: backgroundType = bg;
            return (
              <li key={i}>
                <button
                  className={styles.item}
                  onClick={() => setBgSelected(bg)}
                  style={{
                    background: BackGround[data],
                  }}
                >
                  {bgSelected === bg && (
                    <span className={styles.selected}>
                      <Svg src={iconCheck} alt="check" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <Form.Item
          className={styles.title}
          name="title"
          label="Board title"
          rules={[
            { required: true, message: 'Board title is required' },
            {
              min: 3,
              max: 20,
              message: 'Board title must be range 3 to 20 character',
            },
          ]}
        >
          <Input ref={inputRef} minLength={3} maxLength={20} />
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            disabled={disableButton}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ModalAddBoard;
