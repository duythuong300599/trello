import { Dropdown, MenuProps } from 'antd';
import React from 'react';

type Props = {
  menu?: MenuProps['items'];
  children?: React.ReactNode | React.ReactNode[];
  trigger?: Array<any>;
};

function DropdownComponent(props: Props) {
  const items: MenuProps['items'] = props.menu;
  return (
    <Dropdown trigger={props.trigger} menu={{ items }}>
      <div>{props.children}</div>
    </Dropdown>
  );
}

export default DropdownComponent;
