import React, { useCallback, useRef, useState } from 'react'

import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import styles from './index.module.scss'
import Card from '../card'
import StrictModeDroppable from 'components/atoms/strictMode/Dropable';
import IconPlus from 'assets/images/plus.svg'
import Svg from 'components/atoms/Svg';
import { Form } from 'antd';
import { TextArea } from 'components/atoms/Input';
import Button from 'components/atoms/Button';

interface Props {
  data: any;
  onAddCard?: (colId: string, cardTitle: string) => void;
  columnId?: string;
}

function Column(props: Props) {
  const { data, columnId, onAddCard } = props;
  const [form] = Form.useForm()
  const [addCard, setAddCard] = useState(false);

  const textRef = useRef<any>()

  const [array, setArray] = useState(data.cards);

  const handleAddCard = useCallback(
    (data: any) => {
      console.log(data);
      if (!data.addCard && textRef.current) {
        textRef.current.focus();
        return
      }

      if (data.addCard && columnId) {
        onAddCard?.(columnId, data.addCard)
        form.resetFields()
        setAddCard(false);
      }
    },
    [onAddCard]
  )


  return (
    <div className={styles.colWrapper}>
      <div className={styles.colHeader}>{data.title}</div>
      <div className={styles.colBody}>
        <StrictModeDroppable droppableId={data._id} type='CARD' >
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {array.map((value: any, index: number) => (
                  <Draggable key={value._id} draggableId={value._id} index={index}>
                    {(_provided, _snapshot) => {
                      return (
                        <div
                          className={styles.card}
                          {..._provided.dragHandleProps}
                          ref={_provided.innerRef}
                          {..._provided.draggableProps}
                        >
                          <Card title={value.title} />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </StrictModeDroppable>
      </div>
      {addCard ?
        <>
          <Form
            form={form}
            onFinish={handleAddCard}
          >
            <Form.Item name='addCard'>
              <TextArea
                ref={textRef}
                placeholder='Nhập tiêu đề cho thẻ này...'
              />
            </Form.Item>
            <div className={styles.action}>
              <Button
                type='primary'
                htmlType='submit'
              >
                Thêm thẻ
              </Button>
            </div>
          </Form>
        </>
        :
        <div className={styles.colFooter} onClick={() => setAddCard(true)}>
          <Svg src={IconPlus} height={16} width={16} alt='icon plus' />
          Thêm thẻ
        </div>
      }
    </div >
  )
}

export default Column