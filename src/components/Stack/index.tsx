import React, { FC } from 'react';

import style from './index.module.css';

type IProps = {
  children: React.ReactNode;
  reverseCol?: boolean;
};

const Stack: FC<IProps> = ({
  children,
  reverseCol = false,
}: IProps): JSX.Element => {
  return (
    <div className='container'>
      <div
        className={reverseCol ? style.reverseColWrapper : style.stackWrapper}
      >
        {children}
      </div>
    </div>
  );
};

export default Stack;
