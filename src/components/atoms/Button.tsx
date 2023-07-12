import { Button as ButtonAntd, ButtonProps } from 'antd';
import React from 'react';

type Props = ButtonProps & {
  children?: React.ReactNode | React.ReactNode[];
};

function Button(props: Props) {
  return <ButtonAntd {...props}>{props?.children}</ButtonAntd>;
}

export default Button;
