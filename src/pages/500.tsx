import { NextPage } from 'next';

const ServerError: NextPage = () => {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <h1 className='mt-8 text-4xl md:text-6xl'>Internel Server Error</h1>
        </div>
      </section>
    </main>
  );
};

export default ServerError;
