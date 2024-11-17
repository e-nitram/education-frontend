import { FC } from 'react';

type IProps = {
  src: string;
};

const IFrame: FC<IProps> = (props) => {
  const { src } = props;
  return (
    <iframe
      src={src}
      width='0'
      height='0'
      style={{ display: 'none', visibility: 'hidden' }}
    />
  );
};

export default IFrame;
