const ProjectPage = async ({ params }: { params: { domain: string }}) => {
  const { domain } = params;
  return (
    <div>{ domain }</div>
  )
}

export default ProjectPage