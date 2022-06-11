import React from 'react';
import Certificates from './Certificates';
import Internship from './Internship';
import "./PersonalDetailRight.css";
import Projects from './Projects';
import ResearchPaper from './ResearchPaper';
import Skills from './Skills';

function PersonalDetailRight({user}) {
  return (
    <div className='personalright'>
      <Skills user={user}/>
      <Projects user={user}/>
      <Internship user={user}/>
      <ResearchPaper user={user}/>
      <Certificates user={user}/>

    </div>
  )   
}

export default PersonalDetailRight