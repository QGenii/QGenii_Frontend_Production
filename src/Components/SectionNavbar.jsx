import React from 'react';

const sectionList = [
  { label: 'Programming Language', id: 'programming' },
  { label: 'Projects', id: 'projects' },
  { label: 'Beginner DSA', id: 'beginner-dsa' },
  { label: 'Algorithms', id: 'algorithms' },
  { label: 'Data Structures', id: 'data-structures' },
  { label: 'Star wise path', id: 'star-wise-path' },
  { label: 'Difficulty rating wise', id: 'difficulty-rating' },
  { label: 'Interview Questions', id: 'interview-questions' },
  { label: 'Company Based Questions', id: 'company-questions' },
  { label: 'Advanced Challenge Question', id: 'advanced-challenges' },
  { label: 'Other learning paths', id: 'company-based-q' }
];

const SectionNavbar = () => {
  const [activeSection, setActiveSection] = React.useState(sectionList[0].id);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      let found = activeSection;
      for (const section of sectionList) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            found = section.id;
            break;
          }
        }
      }
      if (found !== activeSection) setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Inject custom styles for active underline and scrollbar hiding
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nav-link::-webkit-scrollbar {
        display: none;
      }
      .nav-link.active {
        background-color: #333; /* Highlight background for active item */
      }
      .nav-link.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px; /* Vertical indicator */
        background: #f1f1f1;
        border-radius: 2px;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;     /* Firefox */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav className="bg-black shadow-sm border-r border-gray-800 h-[calc(100vh-40px)] overflow-y-auto hide-scrollbar rounded-3">
      <div className="flex flex-col text-white py-4">
        {sectionList.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(section.id);
            }}
            className={`relative px-4 py-3 text-sm font-medium hover:text-white transition-colors ${activeSection === section.id ? 'text-white active' : 'text-[#f1f1f1]/70'
              } nav-link`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SectionNavbar;
