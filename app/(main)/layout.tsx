"use client";

import { useUserStore } from '@/lib/userStore';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as motion from "motion/react-client";
import Navbar from '@/components/Navbar';

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [ loading, setLoading ] = useState(true);
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
    getWebsites(token).then((w) => {
      setWebsites(w)
      setLoading(false);
    }, () => {
      return router.replace('/signin');
    });

  }, [ router, getUser, getWebsites, setUser, setWebsites ]);
  
  return (
    <section className='h-screen w-screen bg-black py-3 flex'>
      <Navbar />
        { loading ? (
          <motion.div initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3,
            repeat: -1
          }} 
          className='h-[380px] w-[350px] bg-[#767676] rounded-4xl'
          >

          </motion.div>
        ): children }
    </section>
  )
}

export default ProjectsLayout;