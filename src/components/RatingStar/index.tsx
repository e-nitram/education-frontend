import React, { FC } from 'react';

const StarRating = ({ rating = 0 }) => {
  const stars: React.ReactNode[] = [];
  const userRating = rating;

  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<StarRatingComponent />);
  }
  const remainingStars = userRating - Math.floor(userRating);
  stars.push(<StarRatingComponent width={remainingStars} />);

  return (
    <div style={{ display: 'flex' }}>
      {stars?.map((star, index) => <span key={index}>{star}</span>)}
    </div>
  );
};
export default StarRating;

type TProps = {
  width?: number;
};

const StarRatingComponent: FC<TProps> = ({ width = 30.789 }: TProps) => {
  const percentage = width === 30.789 ? 30.789 : 30.789 * width;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={percentage}
      height='29.684'
      viewBox={`0 0 ${percentage} 29.684`}
    >
      <defs>
        <clipPath id='clip-path'>
          <rect
            id='Rectangle_477'
            data-name='Rectangle 477'
            width={percentage}
            height='29.684'
            transform='translate(0 0)'
            fill='#f4b51e'
          />
        </clipPath>
      </defs>
      <g
        id='Mask_Group_11'
        data-name='Mask Group 11'
        clipPath='url(#clip-path)'
      >
        <g id='grade_black_24dp' transform='translate(0.311 -0.121)'>
          <path
            id='Path_275'
            data-name='Path 275'
            d='M0,0H30.017V30.017H0Z'
            fill='none'
          />
          <path
            id='Path_276'
            data-name='Path 276'
            d='M14.326,20.9l6.466,3.9a.628.628,0,0,0,.938-.675l-1.713-7.354,5.7-4.94a.629.629,0,0,0-.363-1.1L17.84,10.1,14.9,3.167a.623.623,0,0,0-1.151,0L10.811,10.1l-7.517.638a.626.626,0,0,0-.35,1.1l5.7,4.94L6.934,24.129a.628.628,0,0,0,.938.675Z'
            transform='translate(0.683 0.698)'
            fill='#f4b51e'
          />
        </g>
      </g>
    </svg>
  );
};
