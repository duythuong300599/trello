import React, { useEffect, useState } from 'react'

import styles from './index.module.scss'
import Column from '../column'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import StrictModeDroppable from 'components/atoms/strictMode/Dropable'
import { useBoards } from 'hooks/useBoards'
import { Spin } from 'antd'
import { addNewCard } from 'api/boards'

function ContentBoard() {

  const [data, setData] = useState<any>();

  const { data: dataBoards, isLoading } = useBoards('646605b9f7e904b1dfa8ba0e')

  const handleDragEnd = (results: any) => {
    const { source, destination, type } = results;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (type === 'COLUMN') {
      const columns = [...data.columns];
      const [movedColumn] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, movedColumn);
      setData({ ...data, columns });
    }

    if (type === 'CARD') {
      const columns = [...data.columns];
      const sourceColumn = columns.find((column) => column._id === source.droppableId);
      const destinationColumn = columns.find((column) => column._id === destination.droppableId);
      const [movedCard] = sourceColumn!.cards.splice(source.index, 1);
      destinationColumn?.cards.splice(destination.index, 0, movedCard);
      setData({ ...data, columns });
    }
  }

  const onAddCard = async (colId: string, cardTitle: string) => {
    try {
      const columns = [...data.columns];
      const column = columns.find((col) => col._id === colId);

      if (column) {
        const payload = {
          boardId: data._id,
          columnId: colId,
          title: cardTitle,
        }
        const res = await addNewCard(payload);
        if (res) {
          column.cards.push(res);
          setData({ ...data, columns });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (dataBoards) setData(dataBoards)
  }, [dataBoards]);

  return (
    <Spin spinning={isLoading}>
      <div className={styles.boardContent}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId='droppableCol' type='COLUMN' direction='horizontal' >
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.boardContent}
                >
                  {data?.columns.map((value: any, index: number) => {
                    return (
                      <Draggable key={value._id} draggableId={value._id} index={index}>
                        {(_provided, _snapshot) => {
                          return (
                            <div
                              className={styles.col}
                              {..._provided.dragHandleProps}
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                            >
                              <Column columnId={value._id} onAddCard={onAddCard} data={value} />
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )
            }}
          </StrictModeDroppable>

        </DragDropContext>
      </div>
    </Spin>
  )
}

export default ContentBoard