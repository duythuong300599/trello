import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  displayName?: string;
}

function Svg(props: Props) {
  const alt = props.alt || props.displayName || '';
  return (
    <img {...props} alt={alt} />
  );
}

Svg.displayName = 'Svg';

export default Svg;