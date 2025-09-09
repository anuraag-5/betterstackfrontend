import React from 'react'

const AuthLayout = ({ children }: { children:  React.ReactNode }) => {
  return (
    <section className='bg-[image:var(--image-url)] bg-cover bg-center'>
        { children }
    </section>
  )
}

export default AuthLayout