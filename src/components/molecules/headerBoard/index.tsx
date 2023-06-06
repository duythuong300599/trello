import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import Input from 'components/atoms/Input';
import Svg from 'components/atoms/Svg';
import Edit from 'assets/images/pen.svg';
import { InputRef } from 'antd';

function HeaderBoard() {
  const [editBoardName, setEditBoardName] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState('124234');
  const inputRef = useRef<InputRef>(null);

  const onValueInputChange = (e: any) => {
    setValueInput(e.target.value)
  }

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current!.focus({ cursor: 'all' });
    }
  }, [inputRef, editBoardName])

  return (
    <div className={styles.headerBoard}>
      <title>{valueInput}</title>
      <div className={styles.boardName}>
        {editBoardName ?
          <React.Fragment>
            <Input
              ref={inputRef}
              value={valueInput}
              autoFocus
              maxLength={20}
              className={styles.inputBoardName}
              onChange={onValueInputChange}
              onBlur={() => setEditBoardName(false)}
            />
          </React.Fragment>
          :
          <React.Fragment>
            <div className={styles.title}>
              {valueInput}
            </div>
            <Svg className={styles.iconEdit} width={16} height={16} src={Edit} onClick={() => setEditBoardName(true)} />
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default HeaderBoard