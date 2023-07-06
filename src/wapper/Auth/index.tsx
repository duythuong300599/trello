import Header from 'components/organisms/header'
import styles from './index.module.scss'
import { useSpring, animated } from '@react-spring/web';
import spring from 'utils/spring';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children } = props;

  const { pathname } = useLocation();
  const [springStyles, api] = useSpring(() => spring.FADED);

  useEffect(() => {
    api.start(spring.FADED);
    return () => {
      api.stop();
    };
  }, [api, pathname]);
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <Header />
        <animated.div style={springStyles} className={styles.mainContent}>{children}</animated.div>
      </div>
    </div>
  )
}

export default Auth