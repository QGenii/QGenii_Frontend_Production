import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Ritesh Kumar Yadav',
      role: 'Founder & CEO, Director',
      email: '',
      linkedin: '',
      image: 'https://via.placeholder.com/300x300?text=Ritesh+Kumar+Yadav',
    },
    {
      name: 'Sachin Kumar Yadav',
      role: 'COO',
      email: 'sachinky9631@gmail.com',
      linkedin: '',
      image: 'https://via.placeholder.com/300x300?text=Sachin+Kumar+Yadav',
    },
    {
      name: 'Syed Kamaluddin',
      role: 'CO - FOUNDER',
      email: 'syedkamaluddin24@gmail.com',
      linkedin: 'https://www.linkedin.com/in/syed-kamal-6436b0328/',
      image: 'https://via.placeholder.com/300x300?text=Syed+Kamaluddin',
    },
    {
      name: 'Pashupatinath Mishra',
      role: 'Co-Founder',
      email: 'pashupatinath0622@gmail.com',
      linkedin: 'https://www.linkedin.com/in/pashupatinath-mishra-550246229/',
      image: 'https://via.placeholder.com/300x300?text=Pashupatinath+Mishra',
    },
  ];

  const devTeam = [
      {
      name: 'Nitesh Sharma',
      role: 'SDE Intern,Full Stack Developer, Backend Lead',
      email: 'niteshsharmans775@gmail.com',
      linkedin: 'https://www.linkedin.com/in/nitesh-sharma-5b4115306',
      image: 'https://via.placeholder.com/300x300?text=Nitesh+Sharma',
    },
    {
      name: 'Harshal Soladhra',
      role: 'AI Developer',
      email: 'soladhraharshal@gmail.com',
      linkedin: 'https://in.linkedin.com/in/harshal-soladhra-12848b322',
      image: 'https://via.placeholder.com/300x300?text=Harshal+Soladhra',
    },
    {
      name: 'Balaji Saw',
      role: 'SDE Intern',
      email: 'balajisaw07@gmail.com',
      linkedin: 'https://www.linkedin.com/in/balaji-s-922165258/',
      image: 'https://via.placeholder.com/300x300?text=Balaji+Saw',
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-8 drop-shadow-2xl">
            About Us
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-sky-100 max-w-4xl mx-auto leading-relaxed font-semibold drop-shadow-lg">
            QGenii is an AI-powered, free-first learning and opportunity platform designed to bridge the gap between education, skills, and employability in India. The platform enables learners to access core learning, structured roadmaps, and hands-on practice without any upfront cost, ensuring that financial limitations do not restrict skill development. By using 15+ AI models, QGenii personalizes learning journeys, identifies skill gaps, supports continuous assessment, and prepares learners for real-world career opportunities. Built with an India-first approach, QGenii focuses strongly on Tier-2 and Tier-3 regions and aims to create a scalable learning-to-career ecosystem where education leads to measurable skills and meaningful outcomes.
          </p>
          <div className="w-32 h-2 bg-white mx-auto rounded-full shadow-2xl"></div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 drop-shadow-lg">Our Core Values</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto font-semibold">The principles that guide everything we do</p>
            <div className="mt-10 w-32 h-2 bg-primary-600 mx-auto rounded-full shadow-xl"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-primary-200 hover:border-primary-400 transform hover:-translate-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Accessibility First</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Breaking down barriers to education through free-first learning and AI-powered personalization.</p>
            </div>
            <div className="text-center group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-primary-200 hover:border-primary-400 transform hover:-translate-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Innovation</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Leveraging cutting-edge AI technology to create personalized learning experiences and career pathways.</p>
            </div>
            <div className="text-center group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-primary-200 hover:border-primary-400 transform hover:-translate-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Community</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Building a supportive ecosystem where learners, mentors, and employers collaborate for mutual growth.</p>
            </div>
            <div className="text-center group bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-primary-200 hover:border-primary-400 transform hover:-translate-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">Excellence</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Committed to delivering high-quality education and measurable outcomes that transform careers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose QGenii */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6 drop-shadow-lg">Why Choose QGenii?</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto font-semibold">What sets us apart in the world of online learning</p>
            <div className="mt-10 w-32 h-2 bg-primary-600 mx-auto rounded-full shadow-xl"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-10 rounded-3xl border-4 border-primary-200 hover:border-primary-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">AI-Powered Learning</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">15+ AI models personalize your learning journey, identify skill gaps, and provide continuous assessment.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-3xl border-4 border-green-200 hover:border-green-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Free-First Approach</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">Access core learning, roadmaps, and practice without any upfront costs. Financial barriers don't limit your growth.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-10 rounded-3xl border-4 border-purple-200 hover:border-purple-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Career Focus</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">Direct connection between learning and employment through mentorship, certification, and job opportunities.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-3xl border-4 border-blue-200 hover:border-blue-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">India-First Approach</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">Designed specifically for Indian learners with focus on Tier-2 and Tier-3 regions and local career opportunities.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl border-4 border-orange-200 hover:border-orange-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Measurable Outcomes</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">Track your progress with verified assessments and clear metrics that demonstrate real skill development.</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 rounded-3xl border-4 border-red-200 hover:border-red-400 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Supportive Community</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">Join a thriving community of learners, mentors, and professionals working together towards career success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">Creating measurable change in education and careers across India</p>
            <div className="mt-8 w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15+</div>
              <p className="text-primary-100">AI Models</p>
              <p className="text-sm text-primary-200 mt-1">Powering personalization</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">100K+</div>
              <p className="text-primary-100">Learners</p>
              <p className="text-sm text-primary-200 mt-1">Empowered with skills</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-primary-100">Companies</p>
              <p className="text-sm text-primary-200 mt-1">Partnered for careers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">85%</div>
              <p className="text-primary-100">Placement Rate</p>
              <p className="text-sm text-primary-200 mt-1">Career success stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The principles that guide our journey and shape our future</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To make skill-based, outcome-driven education accessible to every learner in India and convert learning into real career opportunities.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our mission is to remove financial and accessibility barriers from learning by offering free-first education supported by AI-driven personalization. We aim to empower learners with practical skills, verified assessments, and clear career pathways by directly connecting learning with mentorship, certification, and employment opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-primary-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold tracking-wide uppercase shadow-2xl">Leadership</span>
            </div>
            <h2 className="text-6xl font-black text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 drop-shadow-2xl">Leadership Team</h2>
            <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed font-semibold">Meet the visionaries driving innovation and excellence at QGenii</p>
            <div className="mt-10 w-40 h-3 bg-gradient-to-r from-primary-600 to-blue-600 mx-auto rounded-full shadow-2xl"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative bg-white rounded-3xl shadow-3xl overflow-hidden hover:shadow-4xl transition-all duration-700 border-4 border-transparent hover:border-primary-400 group transform hover:-translate-y-6 hover:rotate-2">
                {/* Premium Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-2xl flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>Leader</span>
                  </div>
                </div>
                
                <div className="relative overflow-hidden h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-600 opacity-10"></div>
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex space-x-3">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="bg-white/95 backdrop-blur-sm p-3 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-110">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/95 backdrop-blur-sm p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-110">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{member.name}</h3>
                  <div className="inline-block bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-2xl">
                    {member.role}
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    {member.email && (
                      <div className="flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <a href={`mailto:${member.email}`} className="text-gray-700 hover:text-primary-600 transition-colors duration-300 font-semibold truncate">{member.email}</a>
                      </div>
                    )}
                    {member.linkedin && (
                      <div className="flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">LinkedIn Profile</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold tracking-wide uppercase shadow-2xl">Development Team</span>
            </div>
            <h2 className="text-6xl font-black text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 drop-shadow-2xl">Technical Excellence</h2>
            <p className="text-gray-600 text-2xl max-w-3xl mx-auto leading-relaxed font-semibold">The engineers and innovators crafting the future of AI-powered education</p>
            <div className="mt-10 w-40 h-3 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full shadow-2xl"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {devTeam.map((member, index) => (
              <div key={index} className="relative bg-white rounded-3xl shadow-3xl overflow-hidden hover:shadow-4xl transition-all duration-700 border-4 border-gray-100 hover:border-blue-400 group transform hover:-translate-y-6">
                {/* Tech Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-2xl flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    <span>Dev</span>
                  </div>
                </div>
                
                <div className="relative overflow-hidden h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Social Icons Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex space-x-4 justify-center">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="bg-white/95 backdrop-blur-sm p-4 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-110">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/95 backdrop-blur-sm p-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-110">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{member.name}</h3>
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-2xl">
                    {member.role}
                  </div>
                  <div className="space-y-3.5 text-sm">
                    {member.email && (
                      <div className="flex items-center space-x-3 text-gray-600 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                        </div>
                        <a href={`mailto:${member.email}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold truncate text-sm">{member.email}</a>
                      </div>
                    )}
                    {member.linkedin && (
                      <div className="flex items-center space-x-3 text-gray-600 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold text-sm">LinkedIn Profile</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">See what our partners and users have to say about QGenii</p>
            <div className="mt-8 w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Microsoft</h3>
                  <p className="text-gray-600 text-sm">Technology Partner</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "QGenii's innovative approach to AI-powered learning aligns perfectly with our mission to empower developers worldwide. Their platform demonstrates exceptional commitment to accessibility and skill development."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Google for Startups</h3>
                  <p className="text-gray-600 text-sm">Innovation Partner</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "QGenii's focus on democratizing education through AI is exactly what the startup ecosystem needs. Their India-first approach and commitment to Tier-2/3 cities is commendable."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Amazon Web Services</h3>
                  <p className="text-gray-600 text-sm">Cloud Partner</p>
                </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "QGenii's scalable architecture and focus on practical skill development make them an ideal partner for building the next generation of cloud-native developers in India."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-gradient-to-r from-sky-700 via-sky-800 to-sky-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black mb-8 drop-shadow-2xl">Join Our Journey</h2>
          <p className="text-2xl mb-12 text-sky-100 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-lg">
            Be part of a growing community of learners and innovators. Start your coding journey with us today!
          </p>
          <button className="bg-white text-sky-800 px-12 py-5 rounded-2xl font-black text-xl shadow-3xl hover:bg-gray-100 transition-all duration-300 hover:shadow-4xl transform hover:-translate-y-2 hover:scale-105">
            Get Started
          </button>
          <div className="mt-12 flex justify-center space-x-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;