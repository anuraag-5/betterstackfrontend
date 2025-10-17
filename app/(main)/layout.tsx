"use client";

import { useUserStore } from '@/lib/userStore';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { getUser, getWebsites, setUser, setWebsites } = useUserStore();

  useEffect(() => {

    const token = localStorage.getItem("jwt");
    if(!token) {
        return router.replace("/signin");
    }

    getUser(token).then((user) => {
        if(!user.success) {
          localStorage.removeItem("jwt");
          return router.replace("/signin")
        }
        setUser({ name: user.name, email: user.email, id: user.id });
    }, () => {
      return router.replace('/signin');
    });
    getWebsites(token).then((w) => setWebsites(w), () => {
      return router.replace('/signin');
    });

  }, [ router, getUser, getWebsites, setUser, setWebsites ]);
  
  return (
    <section className='h-screen w-screen bg-black py-3 flex'>
      <Navbar />
        { children }
    </section>
  )
}

export default ProjectsLayout;