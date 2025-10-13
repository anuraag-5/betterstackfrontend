import { ReactNode } from 'react';

const ProjectLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='text-black'>{ children }</div>
  );
}

export default ProjectLayout;