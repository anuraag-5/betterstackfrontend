"use client";

import { use } from "react";

const Project = ({ params }: { params: Promise<{ domain: string }>}) => {
    const domainName = use(params);
  return (
    <div>
        { domainName.domain }
    </div>
  )
}

export default Project