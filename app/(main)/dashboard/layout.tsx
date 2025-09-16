import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-[#4B4B3E] min-h-screen min-w-screen'>
        { children }
    </div>
  )
}

export default layout