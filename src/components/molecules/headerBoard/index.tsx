import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import Input from 'components/atoms/Input';
import Svg from 'components/atoms/Svg';
import Edit from 'assets/images/pen.svg';
import { InputRef } from 'antd';
import { updateBoard } from 'api/boards';

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
    setValueInput(e.target.value)
  }

  const handleBlur = async () => {
    try {
      setEditBoardName(false)
      const value = await updateBoard(id, { title: valueInput })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (title) setValueInput(title)
  }, [title])


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
              onBlur={handleBlur}
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