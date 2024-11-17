export const ProgressBar = ({ colour }: { colour: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='44'
      height='44'
      viewBox='0 0 44 44'
    >
      <defs>
        <filter
          id='Ellipse_48'
          x='0'
          y='0'
          width='44'
          height='44'
          filterUnits='userSpaceOnUse'
        >
          <feOffset dy='3' />
          <feGaussianBlur stdDeviation='3' result='blur' />
          <feFlood floodOpacity='0.161' />
          <feComposite operator='in' in2='blur' />
          <feComposite in='SourceGraphic' />
        </filter>
      </defs>
      <g id='Group_431' data-name='Group 431' transform='translate(-602 -135)'>
        <g transform='matrix(1, 0, 0, 1, 602, 135)' filter='url(#Ellipse_48)'>
          <circle
            id='Ellipse_48-2'
            data-name='Ellipse 48'
            cx='13'
            cy='13'
            r='13'
            transform='translate(9 6)'
            // fill="#f4b51e"
            fill={`${colour}`}
          />
        </g>
        {/* <g id="done_black_24dp" transform="translate(614 144)">
                    <path id="Path_198" data-name="Path 198" d="M0,0H20V20H0Z" fill="none"/>
                    <path id="Path_199" data-name="Path 199" d="M8.135,14.5,5.218,11.585a.825.825,0,0,0-1.167,1.167l3.492,3.492a.83.83,0,0,0,1.175,0l8.833-8.825a.825.825,0,1,0-1.167-1.167Z" transform="translate(-0.635 -1.001)" fill="#f5f5f5"/>
                </g> */}
      </g>
    </svg>
  );
};

export const ArrowChevronIcon = ({
  colour,
  rotate = false,
}: {
  colour: string;
  rotate: boolean;
}) => {
  return (
    <svg
      id='arrow_back_ios_black_24dp'
      xmlns='http://www.w3.org/2000/svg'
      width='19.987'
      height='19.987'
      viewBox='0 0 19.987 19.987'
      style={{ transform: `${rotate ? 'rotate(180deg)' : ''}` }}
    >
      <path
        id='Path_26'
        data-name='Path 26'
        d='M0,0H19.987V19.987H0Z'
        fill='none'
        opacity='0.87'
      />
      <path
        id='Path_27'
        data-name='Path 27'
        d='M14.886,2.929a1.04,1.04,0,0,0-1.474,0L6.491,9.849a.829.829,0,0,0,0,1.174l6.921,6.921a1.042,1.042,0,0,0,1.474-1.474l-6.03-6.038,6.038-6.038A1.038,1.038,0,0,0,14.886,2.929Z'
        transform='translate(-1.045 -0.438)'
        fill={`${colour}`}
      />
    </svg>
  );
};
