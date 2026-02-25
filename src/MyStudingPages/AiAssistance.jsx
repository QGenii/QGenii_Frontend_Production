import React, { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { CiBookmarkMinus } from "react-icons/ci";
import { Link } from "react-router-dom";

import trophy from "../assets/MyStuding/stash_trophy.svg";
import Degree from "../assets/MyStuding/overview/Degree.svg";
import Clock from "../assets/MyStuding/overview/Clock.svg";
import Vector from "../assets/MyStuding/overview/Vector.svg";
import SectionList from "./SectionList";
import Notes from "./Notes";
import Announcement from "./Announcement";
import Review from "./Review";
import LearningTool from "./LearningTool";

export default function CoursePlayer() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [assistantTab, setAssistantTab] = useState("course");

  const [askUserQuestion, setAskUserQuestion] = useState("Ask a Question");

  return (
    <div className="w-full h-full  flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-[#0C316E] px-[0.75rem] py-[0.875rem] text-white h-[3.4375rem]">
        <div className="flex  justify-between gap-[10.125rem] relative ">
          <svg onClick={() => setOpen(!open)}
            className="w-[1.5rem] h-[1.5rem] aspect-square"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM13.125 12C13.125 12.2225 13.059 12.44 12.9354 12.625C12.8118 12.81 12.6361 12.9542 12.4305 13.0394C12.225 13.1245 11.9988 13.1468 11.7805 13.1034C11.5623 13.06 11.3618 12.9528 11.2045 12.7955C11.0472 12.6382 10.94 12.4377 10.8966 12.2195C10.8532 12.0012 10.8755 11.775 10.9606 11.5695C11.0458 11.3639 11.19 11.1882 11.375 11.0646C11.56 10.941 11.7775 10.875 12 10.875C12.2984 10.875 12.5845 10.9935 12.7955 11.2045C13.0065 11.4155 13.125 11.7016 13.125 12ZM13.125 7.875C13.125 8.0975 13.059 8.31501 12.9354 8.50002C12.8118 8.68502 12.6361 8.82922 12.4305 8.91436C12.225 8.99951 11.9988 9.02179 11.7805 8.97838C11.5623 8.93498 11.3618 8.82783 11.2045 8.6705C11.0472 8.51316 10.94 8.31271 10.8966 8.09448C10.8532 7.87625 10.8755 7.65005 10.9606 7.44448C11.0458 7.23891 11.19 7.06321 11.375 6.9396C11.56 6.81598 11.7775 6.75 12 6.75C12.2984 6.75 12.5845 6.86853 12.7955 7.0795C13.0065 7.29048 13.125 7.57663 13.125 7.875ZM13.125 16.125C13.125 16.3475 13.059 16.565 12.9354 16.75C12.8118 16.935 12.6361 17.0792 12.4305 17.1644C12.225 17.2495 11.9988 17.2718 11.7805 17.2284C11.5623 17.185 11.3618 17.0778 11.2045 16.9205C11.0472 16.7632 10.94 16.5627 10.8966 16.3445C10.8532 16.1262 10.8755 15.9 10.9606 15.6945C11.0458 15.4889 11.19 15.3132 11.375 15.1896C11.56 15.066 11.7775 15 12 15C12.2984 15 12.5845 15.1185 12.7955 15.3295C13.0065 15.5405 13.125 15.8266 13.125 16.125Z"
              fill="white"
            />
          </svg>

          {open && (
            <div className="absolute left-0 mt-6 w-40 bg-white shadow-lg rounded-lg z-50">
              <ul className="py-2 text-sm text-gray-700 bg-[#D4EBFB]">
                <li onClick={() => setOpen(!open)} className="  text-[0.75rem] gap-[0.3rem] flex px-2 py-2 hover:bg-gray-100 cursor-pointer ">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9.00074 12.9547L5.88824 14.8297C5.75074 14.9172 5.60698 14.9547 5.45698 14.9422C5.30698 14.9297 5.17573 14.8797 5.06323 14.7922C4.95073 14.7047 4.86323 14.5954 4.80073 14.4644C4.73823 14.3334 4.72573 14.1864 4.76323 14.0234L5.58823 10.4797L2.83198 8.09844C2.70698 7.98594 2.62898 7.85769 2.59798 7.71369C2.56698 7.56969 2.57623 7.42919 2.62573 7.29219C2.67523 7.15519 2.75023 7.04269 2.85073 6.95469C2.95123 6.86669 3.08873 6.81044 3.26323 6.78594L6.90073 6.46719L8.30698 3.12969C8.36948 2.97969 8.46649 2.86719 8.59799 2.79219C8.72949 2.71719 8.86374 2.67969 9.00074 2.67969C9.13773 2.67969 9.27199 2.71719 9.40348 2.79219C9.53498 2.86719 9.63199 2.97969 9.69449 3.12969L11.1007 6.46719L14.7382 6.78594C14.9132 6.81094 15.0507 6.86719 15.1507 6.95469C15.2507 7.04219 15.3257 7.15469 15.3757 7.29219C15.4257 7.42969 15.4352 7.57044 15.4042 7.71444C15.3732 7.85844 15.295 7.98644 15.1695 8.09844L12.4132 10.4797L13.2382 14.0234C13.2757 14.1859 13.2632 14.3329 13.2007 14.4644C13.1382 14.5959 13.0507 14.7052 12.9382 14.7922C12.8257 14.8792 12.6945 14.9292 12.5445 14.9422C12.3945 14.9552 12.2507 14.9177 12.1132 14.8297L9.00074 12.9547Z" fill="#1E1E1E" />
                  </svg></span> Favorite Course
                </li>
                <li onClick={() => setOpen(!open)} className="  text-[0.75rem]  gap-[0.3rem] flex px-2 py-2 hover:bg-gray-100 cursor-pointer">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 13.5L12 10.5L10.95 9.45L9.75 10.65V7.5H8.25V10.65L7.05 9.45L6 10.5L9 13.5ZM3.75 6V14.25H14.25V6H3.75ZM3.75 15.75C3.3375 15.75 2.9845 15.6033 2.691 15.3098C2.3975 15.0163 2.2505 14.663 2.25 14.25V4.89375C2.25 4.71875 2.27825 4.55 2.33475 4.3875C2.39125 4.225 2.4755 4.075 2.5875 3.9375L3.525 2.79375C3.6625 2.61875 3.83425 2.48425 4.04025 2.39025C4.24625 2.29625 4.462 2.2495 4.6875 2.25H13.3125C13.5375 2.25 13.7533 2.297 13.9598 2.391C14.1663 2.485 14.338 2.61925 14.475 2.79375L15.4125 3.9375C15.525 4.075 15.6095 4.225 15.666 4.3875C15.7225 4.55 15.7505 4.71875 15.75 4.89375V14.25C15.75 14.6625 15.6033 15.0158 15.3097 15.3098C15.0162 15.6038 14.663 15.7505 14.25 15.75H3.75ZM4.05 4.5H13.95L13.3125 3.75H4.6875L4.05 4.5Z" fill="#1E1E1E" />
                  </svg></span>  Archive Course
                </li>

              </ul>
            </div>
          )}

          {/* review */}
          <div className="flex gap-[0.3125rem] items-center justify-center">
            <svg
              className="w-[1.5rem] h-[1.5rem] aspect-square"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 20.077V4.616C3 4.15533 3.15433 3.771 3.463 3.463C3.77167 3.155 4.15567 3.00067 4.615 3H19.385C19.845 3 20.229 3.15433 20.537 3.463C20.845 3.77167 20.9993 4.156 21 4.616V15.385C21 15.845 20.8457 16.2293 20.537 16.538C20.2283 16.8467 19.8443 17.0007 19.385 17H6.077L3 20.077ZM9.517 13.673L12 12.167L14.483 13.673L13.823 10.848L16.019 8.964L13.133 8.708L12 6.058L10.867 8.708L7.981 8.964L10.177 10.848L9.517 13.673Z"
                fill="white"
              />
            </svg>

            <h4 className="font-normal text-[0.75rem] text-white">
              Write Review{" "}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-[7.9rem]">
          {/* video Title */}
          <h4 className="font-normal text-[1rem] text-white w-[35.625rem]">
            Video Title
          </h4>
          <div className="flex gap-[1.25rem]">
            {/* progress */}
            <div className="flex  flex-col justify-center items-center   w-[13rem] gap-[0.25rem]">
              <div className="flex gap-2">
                <img src={trophy} alt="" />
                <h4 className="font-normal text-[0.625rem] text-white ">
                  Your Progress: <span className="font-bold">(10%)</span>
                </h4>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="208"
                height="4"
                viewBox="0 0 208 4"
                fill="none"
              >
                <rect width="208" height="4" rx="2" fill="#D2E2FC" />
                <rect
                  width="77"
                  height="4"
                  rx="2"
                  fill="url(#paint0_linear_3653_14612)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_3653_14612"
                    x1="0"
                    y1="2"
                    x2="77"
                    y2="2"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F9A21E" />
                    <stop offset="1" stopColor="#FF9900" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* bookmark and share  */}
            <div className="flex gap-2 ">
              <CiBookmarkMinus className="text-2xl cursor-pointer text-white w-[1.5rem] h-[1.5rem] aspect-square" />

              <CiShare2 className="text-2xl cursor-pointer text-white w-[1.5rem] h-[1.5rem] aspect-square" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Panel - AI Assistant */}
        <div className="w-[33.0625rem] h-[44.6875rem] bg-white border-r flex flex-col">
          {/* Tabs */}
          <div className="flex ">
            <input
              type="button"
              value="  Course Contest"
              className={` p[0.625rem] text-sm w-[11.6875rem] h-[2.75rem] shrink-0 ${assistantTab === "course"
                  ? " bg-[#C0D7FA] font-normal"
                  : "text-gray-600"
                }`}
              onClick={() => setAssistantTab("course")}
            />

            <input
              type="button"
              value="AI Assistant"
              className={` p-[0.625rem] text-sm w-[11.6875rem] h-[2.75rem] shrink-0 ${assistantTab === "ai"
                  ? " bg-[#C0D7FA] font-normal "
                  : "text-gray-600"
                }`}
              onClick={() => setAssistantTab("ai")}
            />

            {/* cross */}
            <div className="flex p-[0.625rem] text-sm w-[11rem] h-[2.75rem]  justify-end">
              <svg
                className="w-[4.5rem] h-[1.5rem] aspect-square  "
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.46387 15.5348L15.5359 8.46484M8.46387 8.46484L15.5359 15.5348"
                  stroke="#1E1E1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="  overflow-y-auto">
            {assistantTab === "course" ? (
              <SectionList />
            ) : (
              <div className=" flex  h-[41.5rem] py-[0.625rem] px-[0.5625rem] flex-col  gap-[0.625rem] justify-between shrink-0">
                <div className="flex flex-col gap-[0.625rem] mt-5 ">
                  <div className="flex flex-col items-center justify-center ">
                    <h4 className="font-medium text-[0.875rem] capitalize">
                      Do You Have Any Questions About This Course?
                    </h4>
                    <h4 className="text-[0.625rem] font-normal">
                      Our AI assistant may make mistakes. Verify for accuracy.
                      <Link className="underline">Terms Apply.</Link>
                    </h4>
                  </div>

                  {[1, 2, 3, 4].map((q) => (
                    <div className="flex flex-col gap-[0.625rem] items-center">
                      <span
                        key={q}
                        className="rounded-[0.3125rem]-[0.625rem] w-[20.1875rem] h-[2.1875rem] border border-[#0C316E] bg-[rgba(2,136,231,0.21)] flex px-[3.15rem] py-[0.625rem] justify-center items-center gap-[0.625rem]"
                      >
                        <h4 className="text-[0.625rem] font-normal w-[13.6875rem] bg-em">
                          {" "}
                          Why is learning AI crucial in today's market?
                        </h4>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex w-[31.75rem] px-[2.75rem] py-[0.84375rem]  justify-center items-center gap-[0.46875rem] rounded-[0.3125rem]-[0.9375rem] border-[0.75px] border-[#A6A6A6] bg-white">
                  <div className="flex items-center  justify-center gap-[.31rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="19"
                      viewBox="0 0 12 19"
                      fill="none"
                    >
                      <path
                        d="M4.00469 6.87528V13.6182C4.01248 14.1113 4.21382 14.5816 4.56526 14.9275C4.9167 15.2734 5.39007 15.4673 5.8832 15.4673C6.37634 15.4673 6.8497 15.2734 7.20115 14.9275C7.55259 14.5816 7.75393 14.1113 7.76172 13.6182L7.76781 4.77996C7.77292 4.35853 7.69433 3.94026 7.53659 3.54942C7.37885 3.15858 7.1451 2.80294 6.84889 2.50312C6.55268 2.20329 6.1999 1.96524 5.811 1.80277C5.42211 1.6403 5.00483 1.55664 4.58336 1.55664C4.16189 1.55664 3.74461 1.6403 3.35571 1.80277C2.96682 1.96524 2.61404 2.20329 2.31783 2.50312C2.02161 2.80294 1.78786 3.15858 1.63012 3.54942C1.47238 3.94026 1.39379 4.35853 1.39891 4.77996V13.6778C1.39032 14.2711 1.49977 14.8602 1.72088 15.4109C1.942 15.9615 2.27037 16.4627 2.68691 16.8853C3.10345 17.3079 3.59984 17.6435 4.14723 17.8726C4.69462 18.1016 5.28208 18.2196 5.87547 18.2196C6.46885 18.2196 7.05632 18.1016 7.60371 17.8726C8.1511 17.6435 8.64749 17.3079 9.06403 16.8853C9.48057 16.4627 9.80894 15.9615 10.0301 15.4109C10.2512 14.8602 10.3606 14.2711 10.352 13.6778V5.36309"
                        stroke="#1E1E1E"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Ask a Question"
                      className=" border-none  outline-none rounded-[0.3125rem] w-[23.28rem] text-[0.675rem] font-normal"
                    />
                    <div className="flex w-[2.20313rem] h-[2.20313rem] p-[0.51563rem] justify-end items-center gap-[0.46875rem] rounded-[0.3125rem]-[1.10156rem] bg-[#0C316E]">
                      <svg
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M5.375 9.875L3.125 16.625L16.625 9.875L3.125 3.125L5.375 9.875ZM5.375 9.875H9.875"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Video + Tabs */}
        <div className="flex-1 flex flex-col w-[56.875rem]">
          {/* Video Player */}
          <div className="bg-black h-[23.0625rem]  flex items-center justify-center text-white">
            <video
              src="https://www.pexels.com/download/video/33655178/"
              controls
              muted
              loop
              className="w-full h-full object-cover"
            ></video>
          </div>

          {/* Course Tabs */}
          <div className="border-b flex gap-[2.31rem] px-[0.75rem]  justify-center items-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15 15L19 19M1 9C1 11.1217 1.84285 13.1566 3.34315 14.6569C4.84344 16.1571 6.87827 17 9 17C11.1217 17 13.1566 16.1571 14.6569 14.6569C16.1571 13.1566 17 11.1217 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9Z"
                stroke="#1E1E1E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
            {[
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15 15L19 19M1 9C1 11.1217 1.84285 13.1566 3.34315 14.6569C4.84344 16.1571 6.87827 17 9 17C11.1217 17 13.1566 16.1571 14.6569 14.6569C16.1571 13.1566 17 11.1217 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9Z"
                  stroke="#1E1E1E"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>,
              "overview",
              "q&a",
              "notes",
              "announcements",
              "reviews",
              "Learning tools",
            ].map((tab) => (
              <span
                key={tab}
                className={` p-[0.625rem]  capitalize    text-[1rem] ${activeTab === tab
                    ? " bg-[#C0D7FA] font-medium"
                    : "text-gray-600"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="px-2">{tab}</div>
              </span>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab ===
              (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15 15L19 19M1 9C1 11.1217 1.84285 13.1566 3.34315 14.6569C4.84344 16.1571 6.87827 17 9 17C11.1217 17 13.1566 16.1571 14.6569 14.6569C16.1571 13.1566 17 11.1217 17 9C17 6.87827 16.1571 4.84344 14.6569 3.34315C13.1566 1.84285 11.1217 1 9 1C6.87827 1 4.84344 1.84285 3.34315 3.34315C1.84285 4.84344 1 6.87827 1 9Z"
                    stroke="#1E1E1E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) && "searched"}
            {/* Overview */}
            {activeTab === "overview" && (
              <div className=" px-[2.8rem] ">
                <h2 className=" font-normal text-black w-[43.06rem] text-[1rem] mb-4 ">
                  From Zero To Professional Level: Learn The Keys To Generative
                  AI, LLM Apps, AI Agents, And Cursor AI.
                </h2>

                {/* Ratings and Info Row */}
                <div className="flex     justify-between items-center gap-[0.81rem] text-sm text-gray-600  py-[0.3125rem]">
                  <div className="flex flex-col gap-[0.81rem]  ">
                    <div className="flex items-center gap-4   ">
                      <div className="flex items-center gap-1 ">
                        <span className=" text-lg">
                          <img src={Vector} alt="" />
                        </span>
                        <div className="flex- flex-col items-center justify-center ">
                          <h4 className="text-[0.625rem] font-bold">4.7</h4>

                          <h4 className="text-[0.625rem] text-black">
                            (250 Ratings)
                          </h4>
                        </div>
                      </div>

                      <h4 className="text-[0.625rem] flex  flex-col justify-center items-center ">
                        <img src={Degree} alt="" /> <h4>Learners</h4> (5000)
                      </h4>

                      <h4 className="text-[0.625rem]">
                        <img src={Clock} alt="" /> 7hr 18min
                      </h4>
                    </div>

                    <span className="flex gap-4 text-[0.625rem]">
                      {" "}
                      <h4 className="text-[0.625rem] font-normal text-[#1E1E1E] ">
                        <span className="flex items-center justify-between gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <path
                              d="M12.9697 3.9317V2.35938M5.89418 3.9317V2.35938M2.55299 6.29019H16.3108M2.35645 7.89711C2.35645 6.23437 2.35645 5.40261 2.69921 4.76739C3.00915 4.20081 3.49009 3.74656 4.07343 3.46944C4.74638 3.14554 5.62689 3.14554 7.38789 3.14554H11.4759C13.2369 3.14554 14.1175 3.14554 14.7904 3.46944C15.3824 3.75403 15.8627 4.20843 16.1646 4.76661C16.5074 5.4034 16.5074 6.23516 16.5074 7.8979V11.7595C16.5074 13.4223 16.5074 14.254 16.1646 14.8892C15.8547 15.4558 15.3737 15.9101 14.7904 16.1872C14.1175 16.5103 13.2369 16.5103 11.4759 16.5103H7.38789C5.62689 16.5103 4.74638 16.5103 4.07343 16.1864C3.49021 15.9095 3.00928 15.4555 2.69921 14.8892C2.35645 14.2525 2.35645 13.4207 2.35645 11.758V7.89711Z"
                              stroke="#1E1E1E"
                              strokeWidth="1.17925"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>{" "}
                          Last Updated Aug 28, 2025
                        </span>
                      </h4>
                      <h4 className="text-[0.625rem] font-normal text-[#1E1E1E]">
                        <span className="flex items-center gap-1 justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <path
                              opacity="0.3"
                              d="M4.08523 5.76695H6.0519C6.26523 4.93362 6.5719 4.13362 6.9719 3.39362C5.74523 3.81362 4.72523 4.66029 4.08523 5.76695ZM5.69857 8.43362C5.69857 7.98029 5.73857 7.54029 5.7919 7.10029H3.53857C3.4319 7.52695 3.36523 7.97362 3.36523 8.43362C3.36523 8.89362 3.4319 9.34029 3.53857 9.76695H5.7919C5.73857 9.32695 5.69857 8.88695 5.69857 8.43362ZM4.08523 11.1003C4.72973 12.2137 5.75493 13.0565 6.9719 13.4736C6.56982 12.7229 6.26087 11.9259 6.0519 11.1003H4.08523ZM8.69857 3.12695C8.14523 3.92695 7.7119 4.81362 7.42523 5.76695H9.9719C9.68523 4.81362 9.2519 3.92695 8.69857 3.12695ZM13.3119 5.76695C12.666 4.65477 11.6413 3.81229 10.4252 3.39362C10.8252 4.13362 11.1319 4.93362 11.3452 5.76695H13.3119ZM8.69857 13.7403C9.2519 12.9403 9.68523 12.0536 9.9719 11.1003H7.42523C7.7119 12.0536 8.14523 12.9403 8.69857 13.7403ZM10.4252 13.4736C11.6413 13.055 12.666 12.2125 13.3119 11.1003H11.3452C11.1363 11.9259 10.8273 12.7229 10.4252 13.4736ZM13.8586 7.10029H11.6052C11.6586 7.54029 11.6986 7.98029 11.6986 8.43362C11.6986 8.88695 11.6586 9.32695 11.6052 9.76695H13.8586C13.9652 9.34029 14.0319 8.89362 14.0319 8.43362C14.0319 7.97362 13.9652 7.52695 13.8586 7.10029ZM7.13857 7.10029C7.07857 7.53362 7.0319 7.98029 7.0319 8.43362C7.0319 8.88695 7.07857 9.32695 7.13857 9.76695H10.2586C10.3186 9.32695 10.3652 8.88695 10.3652 8.43362C10.3652 7.98029 10.3186 7.53362 10.2586 7.10029H7.13857Z"
                              fill="#1E1E1E"
                            />
                            <path
                              d="M8.69125 1.76758C5.01125 1.76758 2.03125 4.75424 2.03125 8.43425C2.03125 12.1142 5.01125 15.1009 8.69125 15.1009C12.3779 15.1009 15.3646 12.1142 15.3646 8.43425C15.3646 4.75424 12.3779 1.76758 8.69125 1.76758ZM13.3113 5.76758H11.3446C11.1356 4.94198 10.8267 4.14498 10.4246 3.39425C11.6407 3.81291 12.6654 4.65539 13.3113 5.76758ZM8.69792 3.12758C9.25125 3.92758 9.68458 4.81424 9.97125 5.76758H7.42458C7.71125 4.81424 8.14458 3.92758 8.69792 3.12758ZM3.53792 9.76758C3.43125 9.34091 3.36458 8.89425 3.36458 8.43425C3.36458 7.97425 3.43125 7.52758 3.53792 7.10091H5.79125C5.73792 7.54091 5.69792 7.98091 5.69792 8.43425C5.69792 8.88758 5.73792 9.32758 5.79125 9.76758H3.53792ZM4.08458 11.1009H6.05125C6.26458 11.9342 6.57125 12.7342 6.97125 13.4742C5.75428 13.0572 4.72908 12.2143 4.08458 11.1009ZM6.05125 5.76758H4.08458C4.72908 4.65421 5.75428 3.81132 6.97125 3.39425C6.56917 4.14498 6.26022 4.94198 6.05125 5.76758ZM8.69792 13.7409C8.14458 12.9409 7.71125 12.0542 7.42458 11.1009H9.97125C9.68458 12.0542 9.25125 12.9409 8.69792 13.7409ZM10.2579 9.76758H7.13792C7.07792 9.32758 7.03125 8.88758 7.03125 8.43425C7.03125 7.98091 7.07792 7.53425 7.13792 7.10091H10.2579C10.3179 7.53425 10.3646 7.98091 10.3646 8.43425C10.3646 8.88758 10.3179 9.32758 10.2579 9.76758ZM10.4246 13.4742C10.8246 12.7342 11.1313 11.9342 11.3446 11.1009H13.3113C12.6654 12.2131 11.6407 13.0556 10.4246 13.4742ZM11.6046 9.76758C11.6579 9.32758 11.6979 8.88758 11.6979 8.43425C11.6979 7.98091 11.6579 7.54091 11.6046 7.10091H13.8579C13.9646 7.52758 14.0312 7.97425 14.0312 8.43425C14.0312 8.89425 13.9646 9.34091 13.8579 9.76758H11.6046Z"
                              fill="#1E1E1E"
                            />
                          </svg>
                          English (Main)
                        </span>
                      </h4>
                      <h4 className="text-[0.625rem] font-normal text-[#1E1E1E]">
                        <span className="flex items-center justify-between gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_3588_11638)">
                              <path
                                d="M6.02832 8.68359L5.52832 10.2336H6.52832L6.02832 8.68359Z"
                                fill="#1E1E1E"
                              />
                              <path
                                d="M15.6787 1.93359H7.67871V4.43359H9.67871V5.43359H3.17871C2.32871 5.43359 1.67871 6.08359 1.67871 6.93359V12.4336C1.67871 13.2836 2.32871 13.9336 3.17871 13.9336H3.67871V16.4836L6.82871 13.9336H10.1787V10.4336H15.6787C16.5287 10.4336 17.1787 9.78359 17.1787 8.93359V3.43359C17.1787 2.58359 16.5287 1.93359 15.6787 1.93359ZM7.07871 11.8836L6.82871 11.0836H5.27871L4.97871 11.8836H3.77871L5.42871 7.43359H6.62871L8.27871 11.8836H7.07871ZM14.6787 7.93359V8.93359C14.0287 8.93359 13.3287 8.73359 12.7287 8.43359C12.1287 8.73359 11.4287 8.88359 10.7287 8.93359L10.6787 7.93359C11.0287 7.93359 11.3787 7.88359 11.7287 7.78359C11.2787 7.33359 10.9787 6.78359 10.8287 6.18359H11.8787C12.0287 6.63359 12.3287 6.98359 12.6787 7.28359C13.2287 6.83359 13.5787 6.18359 13.6287 5.43359H10.6287V4.43359H12.1287V3.43359H13.1287V4.43359H14.7787L14.8287 4.93359C14.8787 5.98359 14.4787 7.03359 13.7287 7.78359C14.0787 7.88359 14.3787 7.93359 14.6787 7.93359Z"
                                fill="#1E1E1E"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3588_11638">
                                <rect
                                  width="18"
                                  height="18"
                                  fill="white"
                                  transform="translate(0.52832 0.433594)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          Any Language
                        </span>
                      </h4>
                    </span>
                  </div>

                  {/* Scheduling Box */}
                  <div className="schedule-card">
                    <div className="schedule-card-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <path
                          d="M5.96499 3.71484C5.28659 3.89653 4.66799 4.25364 4.17138 4.75024C3.67478 5.24685 3.31768 5.86545 3.13599 6.54384M18.035 3.71484C18.7134 3.89653 19.332 4.25364 19.8286 4.75024C20.3252 5.24685 20.6823 5.86545 20.864 6.54384"
                          stroke="#0C316E"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 20.5781C14.1217 20.5781 16.1566 19.7353 17.6569 18.235C19.1571 16.7347 20 14.6999 20 12.5781C20 10.4564 19.1571 8.42156 17.6569 6.92127C16.1566 5.42098 14.1217 4.57813 12 4.57812C9.87827 4.57813 7.84344 5.42098 6.34315 6.92127C4.84285 8.42156 4 10.4564 4 12.5781C4 14.6999 4.84285 16.7347 6.34315 18.235C7.84344 19.7353 9.87827 20.5781 12 20.5781ZM13 8.57812C13 8.31291 12.8946 8.05855 12.7071 7.87102C12.5196 7.68348 12.2652 7.57812 12 7.57812C11.7348 7.57812 11.4804 7.68348 11.2929 7.87102C11.1054 8.05855 11 8.31291 11 8.57812V12.3281C11 13.0181 11.56 13.5781 12.25 13.5781H15C15.2652 13.5781 15.5196 13.4728 15.7071 13.2852C15.8946 13.0977 16 12.8433 16 12.5781C16 12.3129 15.8946 12.0586 15.7071 11.871C15.5196 11.6835 15.2652 11.5781 15 11.5781H13V8.57812Z"
                          fill="#0C316E"
                        />
                      </svg>
                      <h4> Scheduling Study Time</h4>
                    </div>

                    <div className="schedule-card-content">
                      <span>Learning a little each day adds up. </span>
                    </div>

                    <div className="flex gap-4">
                      <button>Start Timer</button>
                      <button>Dismiss</button>
                    </div>
                  </div>
                </div>

                {/* By the Numbers Section */}
                <div className="flex  gap-4  justify-center items-center   rounded-[0.3125rem]-lg p-4 text-sm text-gray-700 ">
                  <div className="flex   gap-[1.37rem] px-[1.25rem] py-[0.625rem] bg-blue-100">
                    <div className="flex flex-col justify-center items-center whitespace-nowrap">
                      <h4 className=" text-[0.75rem] font-normal">
                        By The Numbers
                      </h4>
                    </div>

                    <div className="  w-[11.1875rem] text-[0.75rem] font-normal   ">
                      <h4 className="text-[0.75rem] font-normal">
                        Skill Level: Beginner Level
                      </h4>
                      <h4 className="text-[0.75rem] font-normal">
                        Students: 32022
                      </h4>
                      <h4 className="text-[0.75rem] font-normal">
                        Languages: English
                      </h4>
                    </div>
                    <div className="w-[9.1875rem] ">
                      <h4 className="text-[0.75rem] font-normal">
                        Captions: Yes
                      </h4>
                      <h4 className="text-[0.75rem] font-normal">
                        Lectures: 698
                      </h4>
                      <h4 className="text-[0.75rem] font-normal">
                        Video: 71.5 Total Hours
                      </h4>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="flex rounded-[0.3125rem]-[1.25rem] items-center justify-center gap-[1.37rem] px-[1.25rem] py-[0.625rem] bg-blue-100 text-[0.75rem] font-normal h-[2.37rem] w-[18.75rem]">
                    <h4 className="text-[0.75rem] font-normal">Features</h4>
                    <div className="flex  gap-2  font-normal px-2">
                      <h4 className="text-[0.75rem] font-normal">
                        AvailableOn
                      </h4>
                      <a href="#" className=" text-[0.75rem] underline">
                        iOS
                      </a>{" "}
                      <h4 className="text-[0.75rem] font-normal">And</h4>
                      <a href="#" className=" underline text-[0.75rem]">
                        Android
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Q&A */}

            {activeTab === "q&a" && (
              <div className=" bg-gray-50 ">
                {/* Top Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                  {/* Ask A question */}
                  <button onClick={() => setAskUserQuestion("Ask a Question")}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15.4994 23.2502V19.5112L16.5064 19.6792C16.9361 19.7508 17.3763 19.7279 17.7963 19.6122C18.2163 19.4964 18.6061 19.2906 18.9385 19.009C19.2709 18.7274 19.538 18.3768 19.7212 17.9815C19.9044 17.5863 19.9993 17.1558 19.9994 16.7202V14.2622L20.9344 14.0282C21.1675 13.9698 21.3832 13.8563 21.5633 13.6972C21.7434 13.5381 21.8827 13.338 21.9693 13.1138C22.0559 12.8897 22.0875 12.648 22.0612 12.4091C22.0349 12.1702 21.9517 11.9411 21.8184 11.7412L19.9994 9.01116V8.26116C19.9994 3.83516 15.5204 0.301162 10.1814 0.801162C8.27945 0.974548 6.4821 1.74885 5.04962 3.01192C3.61714 4.27499 2.6239 5.96126 2.21376 7.8265C1.80362 9.69175 1.99787 11.6391 2.76837 13.3866C3.53887 15.1341 4.84562 16.5909 6.49937 17.5462V23.2462"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.57227 8.24943C8.57237 7.69946 8.72366 7.1601 9.00959 6.6903C9.29552 6.2205 9.70509 5.83833 10.1935 5.58558C10.682 5.33283 11.2305 5.21921 11.7792 5.25715C12.3279 5.29508 12.8555 5.48311 13.3046 5.80068C13.7536 6.11825 14.1067 6.55314 14.3252 7.05782C14.5438 7.5625 14.6194 8.11755 14.5438 8.6623C14.4682 9.20705 14.2443 9.72055 13.8966 10.1467C13.5489 10.5728 13.0908 10.8951 12.5723 11.0784C12.2797 11.1819 12.0264 11.3735 11.8473 11.6269C11.6682 11.8804 11.5721 12.1831 11.5723 12.4934V12.7494"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.5723 16.5C11.4728 16.5 11.3774 16.4605 11.3071 16.3902C11.2368 16.3198 11.1973 16.2245 11.1973 16.125C11.1973 16.0255 11.2368 15.9302 11.3071 15.8598C11.3774 15.7895 11.4728 15.75 11.5723 15.75M11.5723 16.5C11.6717 16.5 11.7671 16.4605 11.8374 16.3902C11.9078 16.3198 11.9473 16.2245 11.9473 16.125C11.9473 16.0255 11.9078 15.9302 11.8374 15.8598C11.7671 15.7895 11.6717 15.75 11.5723 15.75"
                          stroke="white"
                          stroke-width="1.5"
                        />
                      </svg>
                    </span>
                    <h4 className="text-[0.75rem] font-medium">
                      {" "}
                      Ask a Question
                    </h4>
                  </button>

                  {/* Ai Answer */}
                  <div className="flex items-center gap-[0.3125rem] px-[0.8125rem] py-[0.625rem] rounded-[0.3125rem]-[0.3125rem] border border-[#0C316E]  shadow-[ -1px_4px_12px_0_rgba(12,49,110,0.10)]">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_3602_16284)">
                          <path
                            d="M18.3649 10.283C18.4109 10.3163 18.4549 10.3513 18.4969 10.388C18.4989 10.344 18.4999 10.2997 18.4999 10.255V5.75C18.4999 5.15326 18.2629 4.58097 17.8409 4.15901C17.4189 3.73705 16.8466 3.5 16.2499 3.5H12.7499V2.75L12.7439 2.649C12.7195 2.46909 12.6306 2.30416 12.4938 2.18482C12.3569 2.06547 12.1815 1.9998 11.9999 2L11.8979 2.007C11.7184 2.03165 11.5538 2.12048 11.4347 2.25707C11.3155 2.39366 11.2499 2.56876 11.2499 2.75L11.2489 3.5H7.74891C7.15234 3.50027 6.5803 3.73744 6.15856 4.15936C5.73682 4.58129 5.49991 5.15344 5.49991 5.75V10.255C5.49991 10.8517 5.73696 11.424 6.15892 11.846C6.58087 12.2679 7.15317 12.505 7.74991 12.505H15.5339L15.5539 12.452L15.5619 12.426L16.0119 11.042L16.0169 11.03C16.0963 10.8048 16.2269 10.6011 16.3983 10.4348C16.5697 10.2686 16.7774 10.1444 17.005 10.072C17.2325 9.99965 17.4738 9.98102 17.7097 10.0176C17.9457 10.0542 18.17 10.1451 18.3649 10.283ZM9.74991 6.5C9.91697 6.49527 10.0833 6.5241 10.239 6.58476C10.3947 6.64543 10.5367 6.73671 10.6566 6.85321C10.7764 6.9697 10.8716 7.10904 10.9367 7.26299C11.0017 7.41694 11.0353 7.58237 11.0353 7.7495C11.0353 7.91663 11.0017 8.08206 10.9367 8.23601C10.8716 8.38996 10.7764 8.5293 10.6566 8.6458C10.5367 8.76229 10.3947 8.85357 10.239 8.91424C10.0833 8.97491 9.91697 9.00373 9.74991 8.999C9.42464 8.9898 9.11578 8.85412 8.88896 8.6208C8.66215 8.38747 8.53526 8.0749 8.53526 7.7495C8.53526 7.4241 8.66215 7.11153 8.88896 6.87821C9.11578 6.64488 9.42464 6.5092 9.74991 6.5ZM14.2419 6.5C14.409 6.49527 14.5753 6.5241 14.731 6.58476C14.8867 6.64543 15.0287 6.73671 15.1486 6.85321C15.2684 6.9697 15.3636 7.10904 15.4287 7.26299C15.4937 7.41694 15.5273 7.58237 15.5273 7.7495C15.5273 7.91663 15.4937 8.08206 15.4287 8.23601C15.3636 8.38996 15.2684 8.5293 15.1486 8.6458C15.0287 8.76229 14.8867 8.85357 14.731 8.91424C14.5753 8.97491 14.409 9.00373 14.2419 8.999C13.9166 8.9898 13.6078 8.85412 13.381 8.6208C13.1541 8.38747 13.0273 8.0749 13.0273 7.7495C13.0273 7.4241 13.1541 7.11153 13.381 6.87821C13.6078 6.64488 13.9166 6.5092 14.2419 6.5ZM13.0419 14.037L13.1549 14H6.25391C5.65717 14 5.08487 14.2371 4.66292 14.659C4.24096 15.081 4.00391 15.6533 4.00391 16.25V17.157C4.00381 17.6971 4.12036 18.2308 4.34559 18.7216C4.57083 19.2125 4.89942 19.6489 5.30891 20.001C6.87191 21.344 9.11091 22.001 11.9999 22.001C14.0759 22.001 15.8169 21.662 17.2129 20.973C16.9475 20.9222 16.7001 20.8029 16.495 20.627C16.2899 20.451 16.1344 20.2246 16.0439 19.97L16.0399 19.958L15.5899 18.573C15.4998 18.3018 15.3478 18.0543 15.1459 17.852L14.7869 17.59L14.4279 17.407L13.0429 16.957L13.0309 16.952C12.7305 16.845 12.4705 16.6477 12.2866 16.3871C12.1028 16.1265 12.0041 15.8154 12.0041 15.4965C12.0041 15.1776 12.1028 14.8665 12.2866 14.6059C12.4705 14.3453 12.7305 14.148 13.0309 14.041L13.0419 14.037ZM15.8539 17.146C16.167 17.4581 16.4017 17.8398 16.5389 18.26L16.9869 19.637C17.0241 19.7435 17.0936 19.8358 17.1856 19.901C17.2776 19.9663 17.3876 20.0014 17.5004 20.0014C17.6132 20.0014 17.7232 19.9663 17.8152 19.901C17.9072 19.8358 17.9767 19.7435 18.0139 19.637L18.4609 18.26C18.5998 17.8412 18.8348 17.4607 19.147 17.1488C19.4592 16.837 19.8399 16.6025 20.2589 16.464L21.6369 16.016C21.7423 15.9779 21.8333 15.9082 21.8976 15.8165C21.962 15.7248 21.9965 15.6155 21.9965 15.5035C21.9965 15.3915 21.962 15.2822 21.8976 15.1905C21.8333 15.0988 21.7423 15.0291 21.6369 14.991L21.6099 14.984L20.2319 14.536C19.8133 14.3968 19.4329 14.1621 19.1208 13.8503C18.8087 13.5386 18.5735 13.1584 18.4339 12.74L17.9859 11.363C17.9485 11.2569 17.879 11.165 17.7871 11.0999C17.6952 11.0349 17.5855 11 17.4729 11C17.3604 11 17.2506 11.0349 17.1587 11.0999C17.0668 11.165 16.9974 11.2569 16.9599 11.363L16.5119 12.74L16.4999 12.774C16.3598 13.182 16.1286 13.5527 15.8238 13.858C15.519 14.1633 15.1487 14.3952 14.7409 14.536L13.3639 14.984C13.2586 15.0221 13.1675 15.0918 13.1032 15.1835C13.0388 15.2752 13.0043 15.3845 13.0043 15.4965C13.0043 15.6085 13.0388 15.7178 13.1032 15.8095C13.1675 15.9012 13.2586 15.9709 13.3639 16.009L14.7409 16.457C15.1609 16.597 15.5419 16.833 15.8539 17.146ZM23.0179 20.965L23.7829 21.213L23.7989 21.217C23.858 21.2377 23.9091 21.2763 23.9454 21.3273C23.9816 21.3784 24.001 21.4394 24.001 21.502C24.001 21.5646 23.9816 21.6256 23.9454 21.6767C23.9091 21.7277 23.858 21.7663 23.7989 21.787L23.0329 22.035C22.8003 22.1126 22.5889 22.2432 22.4155 22.4166C22.2421 22.59 22.1115 22.8014 22.0339 23.034L21.7859 23.798C21.7652 23.8571 21.7267 23.9082 21.6756 23.9445C21.6245 23.9807 21.5635 24.0001 21.5009 24.0001C21.4383 24.0001 21.3773 23.9807 21.3262 23.9445C21.2752 23.9082 21.2366 23.8571 21.2159 23.798L20.9659 23.034C20.8888 22.8009 20.7585 22.589 20.5853 22.4151C20.412 22.2412 20.2007 22.11 19.9679 22.032L19.2019 21.783C19.1428 21.7623 19.0917 21.7237 19.0555 21.6727C19.0192 21.6216 18.9998 21.5606 18.9998 21.498C18.9998 21.4354 19.0192 21.3744 19.0555 21.3233C19.0917 21.2723 19.1428 21.2337 19.2019 21.213L19.9679 20.965C20.1975 20.8854 20.4056 20.754 20.5761 20.5809C20.7465 20.4078 20.8748 20.1977 20.9509 19.967L21.1999 19.202C21.2206 19.1429 21.2592 19.0918 21.3102 19.0555C21.3613 19.0193 21.4223 18.9999 21.4849 18.9999C21.5475 18.9999 21.6085 19.0193 21.6596 19.0555C21.7107 19.0918 21.7492 19.1429 21.7699 19.202L22.0189 19.966C22.0965 20.1986 22.2271 20.41 22.4005 20.5834C22.5739 20.7568 22.7853 20.8874 23.0179 20.965Z"
                            fill="#0C316E"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3602_16284">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <input
                      type="button"
                      value="AI Answer"
                      className="text-[#0C316E]"
                      onClick={() => setAskUserQuestion("AI Answer")}
                    />
                  </div>

                </div>

                {/* ask a question
         */}
                {askUserQuestion === "Ask a Question" && (
                  <div className="flex">



                    {/* Filters */}
                    <div className="flex flex-col gap-[0.75rem] px-5  items-center ">
                      <select className=" border  py-[.625rem] bg-[#D4EBFB] rounded-[0.3125rem] w-[7.09375rem]  ">
                        <div className="bg-[#D4EBFB]">
                          <option className="bg-[#D4EBFB]">All Lectures</option>
                          <option className="bg-[#D4EBFB]">Current Lectures</option>
                        </div>
                      </select>
                      <select className="px-4 py-[.625rem] border border-gray-300 rounded-[0.3125rem] bg-[#D4EBFB]">
                        <option className="bg-[#D4EBFB]">Sort By Recommended</option>
                        <option className="bg-[#D4EBFB]">Sort By Recent</option>
                        <option className="bg-[#D4EBFB]">Sort By upvoted</option>
                      </select>
                      <select className="px-4 py-[.625rem] border border-gray-300 rounded-[0.3125rem] bg-[#D4EBFB]">
                        <option className=" checked">Filter Questions</option>
                      </select>
                    </div>

                    <div className=" flex w-[43.8125rem] flex-col items-center gap-[1.75rem] ">
                      {/* Search Bar */}
                      <div className="flex items-center gap-[1.25rem] ">
                        <input
                          type="text"
                          placeholder="Search questions here"
                          className="flex-grow border border-gray-300 rounded-[0.3125rem] px-4 py-2 w-[28.78rem] h-[2.39rem] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="">
                          Search
                        </button>
                      </div>





                      {/* Questions List Header */}
                      <h4 className="text-[0.75rem] font-medium">
                        All Questions In This Course{" "}
                        <span className="font-normal">(368)</span>
                      </h4>

                      {/* Question Card */}
                      <div className=" rounded-[0.3125rem]   p-4  flex items-start gap-[0.62rem] ">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                        <div className="flex-1">
                          <h4 className="font-medium text-[0.75rem]  w-[23.68rem] h-[1.125rem]">
                            Question About Course
                          </h4>
                          <h4 className="text-[#1E1E1E] text-[0.625rem] w-[23.68rem] h-[3.125rem]">
                            Description here
                          </h4>
                        </div>

                        <div className="flex flex-col items-end justify-between ml-4 text-gray-600 text-sm">
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                            >
                              <path
                                d="M3.75 7V16H0.75V7H3.75ZM6.75 16C6.35218 16 5.97064 15.842 5.68934 15.5607C5.40804 15.2794 5.25 14.8978 5.25 14.5V7C5.25 6.5875 5.415 6.2125 5.6925 5.9425L10.6275 1L11.4225 1.795C11.625 1.9975 11.7525 2.275 11.7525 2.5825L11.73 2.8225L11.0175 6.25H15.75C16.1478 6.25 16.5294 6.40804 16.8107 6.68934C17.092 6.97064 17.25 7.35218 17.25 7.75V9.25C17.25 9.445 17.2125 9.625 17.145 9.7975L14.88 15.085C14.655 15.625 14.1225 16 13.5 16H6.75ZM6.75 14.5H13.5225L15.75 9.25V7.75H9.1575L10.005 3.76L6.75 7.0225V14.5Z"
                                fill="#1E1E1E"
                              />
                            </svg>{" "}
                            <span>39</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="19"
                              viewBox="0 0 18 19"
                              fill="none"
                            >
                              <path
                                d="M3.75 7.6C3.75 6.95725 3.75 6.52075 3.7785 6.18325C3.80475 5.85475 3.8535 5.686 3.9135 5.569L2.577 4.888C2.39175 5.25175 2.3175 5.6395 2.283 6.061C2.25 6.4735 2.25 6.982 2.25 7.6H3.75ZM3.75 9.25V7.6H2.25V9.25H3.75ZM2.25 9.25V13H3.75V9.25H2.25ZM2.25 13V15.1855H3.75V13H2.25ZM2.25 15.1855C2.25 16.1537 3.4215 16.639 4.10625 15.9542L3.04575 14.8937C3.10344 14.836 3.17695 14.7967 3.25699 14.7808C3.33702 14.7649 3.41998 14.773 3.49538 14.8043C3.57077 14.8355 3.6352 14.8884 3.68052 14.9563C3.72585 15.0241 3.75003 15.1039 3.75 15.1855H2.25ZM4.10625 15.9542L6.31125 13.75L5.25 12.6895L3.04575 14.8937L4.10625 15.9542ZM11.4 12.25H6.3105V13.75H11.4V12.25ZM13.431 12.0865C13.314 12.1465 13.146 12.1952 12.8168 12.2215C12.4793 12.2492 12.0427 12.25 11.4 12.25V13.75C12.018 13.75 12.5258 13.75 12.939 13.717C13.3605 13.6825 13.7483 13.6082 14.112 13.423L13.431 12.0865ZM14.0865 11.431C13.9427 11.7132 13.7132 11.9427 13.431 12.0865L14.112 13.423C14.6765 13.1354 15.1354 12.6765 15.423 12.112L14.0865 11.431ZM14.25 9.4C14.25 10.0427 14.25 10.4792 14.2215 10.8167C14.1952 11.1452 14.1465 11.314 14.0865 11.431L15.423 12.112C15.6082 11.7483 15.6825 11.3605 15.717 10.939C15.7507 10.5265 15.75 10.018 15.75 9.4H14.25ZM14.25 7.6V9.4H15.75V7.6H14.25ZM14.0865 5.569C14.1465 5.686 14.1952 5.854 14.2215 6.18325C14.25 6.52075 14.25 6.95725 14.25 7.6H15.75C15.75 6.982 15.75 6.47425 15.717 6.061C15.6825 5.6395 15.6082 5.25175 15.423 4.888L14.0865 5.569ZM13.431 4.9135C13.7132 5.05731 13.9427 5.28677 14.0865 5.569L15.423 4.888C15.1354 4.32354 14.6765 3.86462 14.112 3.577L13.431 4.9135ZM11.4 4.75C12.0427 4.75 12.4793 4.75 12.8168 4.7785C13.1453 4.80475 13.314 4.8535 13.431 4.9135L14.112 3.577C13.7483 3.39175 13.3605 3.3175 12.939 3.283C12.5265 3.25 12.018 3.25 11.4 3.25V4.75ZM6.6 4.75H11.4V3.25H6.6V4.75ZM4.569 4.9135C4.686 4.8535 4.854 4.80475 5.18325 4.7785C5.52075 4.75 5.95725 4.75 6.6 4.75V3.25C5.982 3.25 5.47425 3.25 5.061 3.283C4.6395 3.3175 4.25175 3.39175 3.888 3.577L4.569 4.9135ZM3.9135 5.569C4.05731 5.28677 4.28677 5.05731 4.569 4.9135L3.888 3.577C3.32354 3.86462 2.86462 4.32354 2.577 4.888L3.9135 5.569ZM6.3105 13.75V12.25C5.91271 12.2501 5.53124 12.4082 5.25 12.6895L6.3105 13.75Z"
                                fill="#1E1E1E"
                              />
                              <path
                                d="M6 7H12M6 10H9.75"
                                stroke="#1E1E1E"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>{" "}
                            <span>3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {
                  askUserQuestion === "AI Answer" && (
                    <div className="flex flex-col gap-[0.75rem] px-5  items-center ">
                      <h4 className="font-medium text-[0.875rem] capitalize">
                        AI Answer
                      </h4>
                    </div>
                  )
                }

              </div>
            )}
            {activeTab === "notes" && <Notes />}
            {activeTab === "announcements" && <Announcement />}
            {activeTab === "reviews" && <Review />}
            {activeTab === "Learning tools" && <LearningTool />}
          </div>
        </div>
      </div>
    </div>
  );
}
