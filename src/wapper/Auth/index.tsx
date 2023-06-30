import Header from 'components/organisms/header'
import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children } = props;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <Header />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  )
}

export default Auth