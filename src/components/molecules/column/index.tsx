import { Form } from 'antd';
import React, { useCallback, useRef, useState } from 'react';

// eslint-disable-next-line import/extensions
import iconPlus from '@/assets/images/plus.svg';
import Button from '@/components/atoms/Button';
import { TextArea } from '@/components/atoms/Input';
import StrictModeDroppable from '@/components/atoms/strictMode/Dropable';
import Svg from '@/components/atoms/Svg';
import { mapOrder } from '@/utils/helper';

import Card from '../card';
import TitleEditInline from '../TitleEditInline';
import styles from './index.module.scss';

interface Props {
  data: any;
  onAddCard?: (colId: string, cardTitle: string) => void;
  onDeleteColumn?: (id: string) => void;
  columnId: string;
  provided?: any;
}

function Column(props: Props) {
  const { data, columnId, onAddCard, provided } = props;
  const [form] = Form.useForm();
  const [addCard, setAddCard] = useState(false);

  const textRef = useRef<any>();
  const dataCardSorted = mapOrder(data?.cards, data?.cardOrder, '_id');

  const handleAddCard = useCallback(
    (value: any) => {
      if (!value.addCard && textRef.current) {
        textRef.current.focus();
        return;
      }

      if (value.addCard && columnId) {
        onAddCard?.(columnId, value.addCard);
        form.resetFields();
        setAddCard(false);
      }
    },
    [columnId, form, onAddCard],
  );

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
        <StrictModeDroppable droppableId={data._id} type="CARD">
          {(providedCard) => (
            <div {...providedCard.droppableProps} ref={providedCard.innerRef}>
              {dataCardSorted.map((value: any, index: number) => (
                <Card card={value} key={index} index={index} />
              ))}
              {providedCard.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
      {addCard ? (
        <>
          <Form form={form} onFinish={handleAddCard}>
            <Form.Item name="addCard">
              <TextArea
                ref={textRef}
                placeholder="Nhập tiêu đề cho thẻ này..."
              />
            </Form.Item>
            <div className={styles.action}>
              <Button type="primary" htmlType="submit">
                Thêm thẻ
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <div className={styles.colFooter} onClick={() => setAddCard(true)}>
          <Svg src={iconPlus} height={16} width={16} alt="icon plus" />
          Thêm thẻ
        </div>
      )}
    </div>
  );
}

export default Column;
