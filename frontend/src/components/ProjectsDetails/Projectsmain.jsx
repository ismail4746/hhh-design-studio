import React, { Suspense, lazy } from 'react'
import ProjectHero from './ProjectHero'

const ProjectDetails = lazy(() => import('./ProjectsDetails'));

function SectionFallback() {
  return <div className="p-10 text-gray-500 text-center">Loading projects...</div>;
}

const Projectsmain = () => {
  return (
    <>
    <ProjectHero/>
    <Suspense fallback={<SectionFallback />}>
      <ProjectDetails/>
    </Suspense>
    </>
  )
}

export default Projectsmain