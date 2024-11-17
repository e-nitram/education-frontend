export default function SubHeader() {
  return (
    <div className='flex w-full bg-lotion px-4 py-3 xl:bg-white xl:px-24'>
      <div className='column mx-10 my-auto flex flex-col justify-center px-8 xl:w-1/2'>
        <h1 className='text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:text-42 xl:text-left xl:text-xl'>
          Top universities are after people just like you
        </h1>
        <p className='mx-auto mt-4 hidden text-center font-sans text-sm text-black md:block lg:w-1/2 xl:w-full xl:text-left'>
          Unlock your potential with a university placement. Immerse yourself in
          a world of knowledge, growth, and opportunity. Experience excellence,
          innovation, and personal development on your path to success.
        </p>
      </div>
      <div className='my-auto hidden w-1/2 px-20 py-6 xl:block'>
        <ul className='flex flex-col gap-3 font-sans'>
          <li className='font text-md text-black' key='bullet1'>
            <span className='mr-1 font-sans text-md font-bold'>&#10003;</span>{' '}
            Over 120,000 people rely on Education Directory annually
          </li>
          <li className='text-md text-black' key='bullet2'>
            <span className='mr-1 font-sans text-md font-bold'>&#10003;</span>{' '}
            Unlock your potential with Education Directory
          </li>
          <li className='text-md text-black' key='bullet3'>
            <span className='leading-20 mr-1 font-sans text-md font-bold'>
              &#10003;
            </span>{' '}
            Education Directory is committed to providing a free service
          </li>
        </ul>
        {/* <form className='mt-6 flex items-center'>
          <input
            type='email'
            placeholder='Email Address'
            className='h-12 flex-grow rounded-full border-2 border-opacity-0 bg-light px-6 py-2 font-sans text-18 text-dark text-opacity-40 shadow-inset valid:border-primary valid:border-opacity-100 valid:text-primary invalid:border-red invalid:border-opacity-100 invalid:text-red focus:text-black'
          />
          <button
            type='submit'
            className='ml-2 h-12 flex-shrink rounded-full bg-light px-24 py-3 font-sans text-18 text-dark hover:bg-primary hover:text-white'
          >
            Get free updates
          </button>
        </form> */}
      </div>
    </div>
  );
}
