import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

import { Image_Quality } from '@/appConstants';

import 'video.js/dist/video-js.css';
import style from './index.module.css';

type IProps = {
  src: StaticImageData;
  children?: React.ReactNode;
  styles?: string;
  parallax?: boolean;
  quote?: boolean;
  srcType?: 'image' | 'video';
};

const Banner: FC<IProps> = ({
  src,
  children,
  styles,
  parallax = false,
  quote = false,
}): JSX.Element => {
  return (
    <div
      className={`relative ${parallax ? style.parallaxClass : ''} ${
        styles !== undefined
          ? styles
          : quote
          ? style.quoteClass
          : style.defaultBanner
      }`}
    >
      <div className={style.img_container}>
        <div
          className={
            parallax ? style.parallaxGradient : style.gradient_background
          }
        ></div>
        <Image
          src={src}
          fill
          quality={Image_Quality}
          loading='lazy'
          alt='image'
          className={parallax ? style.fixedImageClass : style.imageClass}
        />
        <div className='container relative'>{children}</div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
