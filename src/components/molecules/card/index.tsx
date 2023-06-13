import React from 'react'

import styles from './index.module.scss'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  card?: any
  index: number
}

function Card(props: Props) {
  const { card, index } = props
  return (
    <Draggable key={card._id} draggableId={card._id} index={index}>
      {(_provided, _snapshot) => {
        return (
          <div
            className={styles.card}
            {..._provided.dragHandleProps}
            ref={_provided.innerRef}
            {..._provided.draggableProps}
          >
            <div className={styles.cardWrapper}>{card.title}</div>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Card