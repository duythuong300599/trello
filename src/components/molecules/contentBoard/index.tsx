import { useEffect, useState } from 'react'

import styles from './index.module.scss'
import Column from '../column'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import StrictModeDroppable from 'components/atoms/strictMode/Dropable'
import { useBoards } from 'hooks/useBoards'
import { Spin } from 'antd'
import classNames from 'classnames';
import { addNewCard, addNewColumn, deleteColumn, updateColumn } from 'api/boards'

import iconPlusWhite from 'assets/images/plusWhite.svg';
import Svg from 'components/atoms/Svg'
import FormAddCol from '../FormAddCol'

interface Props {
  dataBoards: any;
  isFetching?: boolean;
  isLoading?: boolean;
  refetch?: () => void;
}

function ContentBoard(props: Props) {

  const { dataBoards, isFetching, isLoading, refetch } = props;

  const [data, setData] = useState<any>();
  const [addCol, setAddCol] = useState(false);

  const handleDragEnd = async (results: any) => {
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
      const columns: any = [...data.columns];
      const sourceColumn = columns.find((column: any) => column._id === source.droppableId);
      const destinationColumn = columns.find((column: any) => column._id === destination.droppableId);
      const [movedCard] = sourceColumn!.cards.splice(source.index, 1);
      const [movedCardId] = sourceColumn!.cardOrder.splice(source.index, 1);

      destinationColumn?.cardOrder.splice(destination.index, 0, movedCardId);
      destinationColumn?.cards.splice(destination.index, 0, movedCard);
      console.log(columns);
      await updateColumn(destinationColumn._id, { cardOrder: destinationColumn.cardOrder })
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
          refetch?.();
          column.cards.push(res);
          setData({ ...data, columns });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddNewColumn = async (columnTitle: string) => {
    try {
      const columns = [...data.columns];
      const newColumn = {
        boardId: data._id,
        title: columnTitle,
      }
      const res = await addNewColumn(newColumn);
      if (res) {
        columns.push(res);
        setData({ ...data, columns });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCol = async (id: string) => {
    try {
      const res = await deleteColumn(id);
      if (res) {
        const columns = [...data.columns];
        const columnDeleted = columns.find((column: any) => column._id === id);
        columns.splice(columns.indexOf(columnDeleted), 1);

        setData({ ...data, columns });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddCol = () => {
    setAddCol(true);
  }

  const handleCloseAddCol = () => {
    setAddCol(false);
  }

  useEffect(() => {
    if (dataBoards) setData(dataBoards)
  }, [dataBoards]);

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.boardContent}>
        <DragDropContext onDragEnd={handleDragEnd} >
          <StrictModeDroppable droppableId='droppableCol' type='COLUMN' direction='horizontal'>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.boardContent}
                >
                  {data?.columns.map((column: any, index: number) => {
                    return (
                      <Draggable key={column._id} draggableId={column._id} index={index}>
                        {(_provided, _snapshot) => {
                          return (
                            <div
                              className={styles.col}
                              // {..._provided.dragHandleProps}
                              ref={_provided.innerRef}
                              {..._provided.draggableProps}
                            >
                              <Column
                                provided={_provided}
                                columnId={column._id}
                                onAddCard={onAddCard}
                                data={column}
                                onDeleteColumn={handleDeleteCol}
                              />
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
        <div
          className={classNames(styles.addCol, addCol ? styles.addActive : '')}
        >
          {!addCol ?
            <div onClick={handleAddCol}>
              <Svg
                src={iconPlusWhite}
                height={16}
                width={16}
                alt='icon'
              />
              <span>Thêm danh sách</span>
            </div>
            :
            <div className={styles.formAddCol}>
              <FormAddCol
                onAddNewColumn={handleAddNewColumn}
                onClose={handleCloseAddCol}
              />
            </div>
          }
        </div>
      </div>
    </Spin>
  )
}

export default ContentBoard