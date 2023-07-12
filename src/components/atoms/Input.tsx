import { Input as InputAntd, InputProps } from 'antd';
import React from 'react';

function Input(props: InputProps, ref: any) {
  return <InputAntd ref={ref} {...props} />;
}

export const { TextArea } = InputAntd;

export default React.forwardRef(Input);
