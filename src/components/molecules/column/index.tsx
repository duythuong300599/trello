import { useCallback, useRef, useState } from 'react'

import styles from './index.module.scss'
import Card from '../card'
import StrictModeDroppable from 'components/atoms/strictMode/Dropable';
import IconPlus from 'assets/images/plus.svg'
import Svg from 'components/atoms/Svg';
import { Form } from 'antd';
import { TextArea } from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import TitleEditInline from '../TitleEditInline';
import { mapOrder } from 'utils/helper';

interface Props {
  data: any;
  onAddCard?: (colId: string, cardTitle: string) => void;
  onDeleteColumn?: (id: string) => void;
  columnId: string;
  provided?: any
}

function Column(props: Props) {
  const { data, columnId, onAddCard, provided } = props;
  const [form] = Form.useForm()
  const [addCard, setAddCard] = useState(false);

  const textRef = useRef<any>()
  const dataCardSorted = mapOrder(data?.cards, data?.cardOrder, '_id');

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
      <div className={styles.colHeader} {...provided.dragHandleProps}>
        <TitleEditInline
          id={columnId}
          title={data.title}
          onDeleteColumn={props?.onDeleteColumn}
        />
      </div>
      <div className={styles.colBody}>
        <StrictModeDroppable droppableId={data._id} type='CARD' >
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dataCardSorted.map((value: any, index: number) => (
                  <Card card={value} key={index} index={index} />
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