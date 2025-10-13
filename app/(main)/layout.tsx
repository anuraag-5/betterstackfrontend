"use client";

import ProjectsNavbar from '@/components/ProjectsNavbar';
import { useUserStore } from '@/lib/userStore';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
          router.replace("/signin")
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
    <section className='min-h-screen bg-linear-to-b from-[#3D3D37] from-0% to-[#2A2A25] to-100% flex flex-col items-center 2xl:px-45 xl:px-24 px-14'>
        <ProjectsNavbar />
        { children }
    </section>
  )
}

export default ProjectsLayout;