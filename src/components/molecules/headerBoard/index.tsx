import { InputRef, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { updateBoard } from '@/api/boards';
// eslint-disable-next-line import/extensions
import iconPencil from '@/assets/images/pen.svg';
import Input from '@/components/atoms/Input';
import Svg from '@/components/atoms/Svg';

import styles from './index.module.scss';

interface Props {
  id?: string;
  title?: string;
}

function HeaderBoard(props: Props) {
  const { id, title } = props;
  const [editBoardName, setEditBoardName] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onValueInputChange = (e: any) => {
    setValueInput(e.target.value);
  };

  const handleBlur = async () => {
    try {
      setEditBoardName(false);
      await updateBoard(id, { title: valueInput });
    } catch (error: any) {
      message.error(error);
    }
  };

  useEffect(() => {
    if (title) setValueInput(title);
  }, [title]);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus({ cursor: 'all' });
    }
  }, [inputRef, editBoardName]);

  return (
    <div className={styles.headerBoard}>
      <title>{valueInput}</title>
      <div className={styles.boardName}>
        {editBoardName ? (
          <React.Fragment>
            <Input
              ref={inputRef}
              value={valueInput}
              autoFocus
              maxLength={20}
              className={styles.inputBoardName}
              onChange={onValueInputChange}
              onBlur={handleBlur}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className={styles.title}>{valueInput}</div>
            <Svg
              className={styles.iconEdit}
              width={16}
              height={16}
              src={iconPencil}
              onClick={() => setEditBoardName(true)}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default HeaderBoard;
