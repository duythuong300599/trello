import React from 'react'

import styles from './index.module.scss'

interface Props {
  title?: string
}

function Card(props: Props) {
  const { title } = props
  return (
    <div className={styles.cardWrapper}>{title}</div>
  )
}

export default Card