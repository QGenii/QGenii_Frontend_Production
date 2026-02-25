import React from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useAuth } from '../../hooks/useAuth';
import {
  Briefcase,
  User,
  Flag,
  GraduationCap,
  Calendar,
  Wrench,
  Layout,
  BookText,
  Monitor,
  Plus,

} from "lucide-react";

const menuItems = [
  { name: "Jobs", icon: <Briefcase size={20} /> },
  { name: "Internship", icon: <User size={20} /> },
  { name: "Competition", icon: <Flag size={20} /> },
  { name: "Scholarship", icon: <GraduationCap size={20} /> },
  { name: "Cultural Events", icon: <Calendar size={20} /> },
  { name: "Workshops", icon: <Wrench size={20} /> },
  { name: "Conferences", icon: <Layout size={20} /> },
  { name: "Blogs", icon: <BookText size={20} /> },
  { name: "Teach On Qgenii", icon: <Monitor size={20} /> },
  { name: "Create Contest", icon: <Plus size={20} /> },
];

export default function Section1() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#f2f2f2] w-full py-8 px-4 ">
      <Container fluid="md">

      
             
      {/* Toggle Button */}
      <div className="w-full   flex justify-end px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2  font-medium bg-transparent border border-white/40 px-4 py-2 rounded-lg bg-white text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 19V5H5V19H19ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z"
              fill="currentColor"
            />
          </svg>
          Host
        </button>
      </div>

      {/* Sidebar Options */}
      {isOpen && (
        <div className="absolute right-0  bg-[#F6F4FF] w-64 rounded-lg shadow-md mt-2  p-4 transition-all duration-300">
          <ul className="flex flex-col gap-3 justify-end">
            {menuItems.map((item, index) => (
             <div > <li
                key={index}
                className="flex items-center gap-3 text-gray-800 font-medium px-3 py-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                {item.icon}
                <span>{item.name}</span>
              </li></div>
            ))}
          </ul>
        </div>
      )}
    


        <Row className="flex flex-col md:flex-row justify-between items-start md:items-center ">
          
         
        
          {/* Left Section */}
          <Col className="mb-6 md:mb-0 md:w-1/2">
            
            <div className="flex items-center w-full mb-6 whitespace-nowrap gap-2 ">
              <h2 className="text-3xl font-bold">Let’s Start Studying</h2>
              <a
                href="#"
                className=" text-lg font-bold text-[#0C316E] underline whitespace-nowrap  pr-10 "
              >
                My Studying
              </a>
            </div>






            {/* Study Card */}
            <div className="flex items-center border border-blue-500 rounded-md overflow-hidden bg-white w-full max-w-[250px]">
              <div className="bg-[#cce5ff] px-6 py-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M5 6h14M5 18h14" />
                </svg>
              </div>
              <div className="p-3 text-sm font-medium text-gray-700">
                <div>2025 Bootcamp</div>
                <div>149. link to download the</div>
              </div>
            </div>

          </Col>

          {/* Right Section: Welcome */}
          <Col className="flex items-center gap-4 md:justify-end md:w-1/2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-base font-semibold">Welcome Back, {user.name}</p>
              <a href="#" className="text-blue-600 text-sm underline font-medium">
                Add Occupation And Interest
              </a>
            </div>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
}
