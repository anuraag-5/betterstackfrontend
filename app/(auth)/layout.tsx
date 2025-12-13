const AuthLayout = ({ children }: { children:  React.ReactNode }) => {
  return (
    <section className='min-h-screen min-w-screen bg-[image:var(--image-url)] bg-cover bg-center'>
        { children }
    </section>
  )
}

export default AuthLayout