import React, { FC } from 'react';

import style from './index.module.css';

type TProps = {
  color?: 'primary' | 'secondary' | 'white' | 'dark';
  height?: string;
};
const Loading: FC<TProps> = ({ color = 'primary', height }: TProps) => {
  const styles = { background: `var(--${color})` };
  return (
    <div className={style.lds_ellipsis} style={{ height: height }}>
      <div style={styles}></div>
      <div style={styles}></div>
      <div style={styles}></div>
      <div style={styles}></div>
    </div>
  );
};

export default Loading;
