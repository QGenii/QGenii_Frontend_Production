import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const projectCards = [
    {
      id: 'python-projects',
      title: 'Python Projects for Beginners',
      description: 'Solve C++ Practice problems online with the Practice C++ path on CodeChef. Answer MCQs exercise...',
      problems: 88,
      level: 'Intermediate Level',
      color: 'bg-project-blue'
    },
    {
      id: 'java-projects',
      title: 'Java Projects for Beginners',
      description: 'Build 6 different Java projects from Calculator to Rock Paper Scissors using our beginner friendly and...',
      problems: 48,
      level: 'Intermediate Level',
      color: 'bg-project-blue'
    },
    {
      id: 'cpp-projects',
      title: 'C++ Projects for Beginners',
      description: 'Build 6 different Cpp projects from Calculator to Rock Paper Scissors using our beginner friendly and...',
      problems: 48,
      level: 'Intermediate Level',
      color: 'bg-project-blue'
    },
    {
      id: 'c-projects',
      title: 'Projects for Beginners in C',
      description: 'Build 5 different projects using C from Calculator to Rock Paper Scissors using our beginner...',
      problems: 40,
      level: 'Intermediate Level',
      color: 'bg-project-blue'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projectCards.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
