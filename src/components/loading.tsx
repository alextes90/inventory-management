export const Loading = () => {
  return (
    <div className='flex h-screen justify-center items-center absolute top-0 w-screen bg-slate-300 opacity-60'>
      <div className='rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin'></div>
    </div>
  );
};
