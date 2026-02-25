// import { useState } from "react";
// // import { IoIosAddCircleOutline } from "react-icons/io";
// import "../MyStudingStyles/ReminderModel.css";
// import { IoSearch } from "react-icons/io5";
// import { FaRegClock } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";
// // import { SiMicrosoftoutlook } from "react-icons/si";
// // import { FaRegClock } from "react-icons/fa";

// const ReminderModal = ({ onClose, onSave }) => {
//   const [step, setStep] = useState(1);
//   const [search, setSearch] = useState("");
//   const [reminder, setReminder] = useState({
//     name: "",
//     course: "",
//     frequency: "Daily",
//     time: "12:00 AM",
//     calendar: "Google",
//   });

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//     else {
//       onSave(reminder);
//       onClose();
//     }
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <div className="title">
//           <h2>Studying reminders</h2>
//         </div>

//         {/* Progress bar */}
//         <div className="progress-bar">
//           <div className={`step ${step >= 1 ? "active" : ""}`} />
//           <div className={`step ${step >= 2 ? "active" : ""}`} />
//           <div className={`step ${step >= 3 ? "active" : ""}`} />
//         </div>

//         {/* Step 1 */}
//         {step === 1 && (
//           <div>
//             <div className=" step1 ">
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={reminder.name}
//                 onChange={(e) =>
//                   setReminder({ ...reminder, name: e.target.value })
//                 }
//                 placeholder="Studying reminder"
//               />
//               <div className="search  ">
//                 <IoSearch className="search-icon" />
//                 <input
//                   className="search-input"
//                   type="text"
//                   placeholder="    Search here"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               <div className="course-div">
//                 <h4 className="flex items-center justify-first">
//                   Attach Content
//                 </h4>
//                 <div className="course-options">
//                   <label>
//                     <input
//                       type="radio"
//                       name="course"
//                       value="Course: Data Science & Machine Learning (Theory+Projects) A-Z 90 HOURS"
//                       checked={
//                         reminder.course ===
//                         "Course: Data Science & Machine Learning (Theory+Projects) A-Z 90 HOURS"
//                       }
//                       onChange={(e) =>
//                         setReminder({ ...reminder, course: e.target.value })
//                       }
//                     />
//                     Course: Data Science & Machine Learning (Theory+Projects)
//                     A-Z 90 HOURS
//                   </label>

//                   <label>
//                     <input
//                       type="radio"
//                       name="course"
//                       value="Course: AZ-204: Developing Solutions for Microsoft Azure Exam 2024"
//                       checked={
//                         reminder.course ===
//                         "Course: AZ-204: Developing Solutions for Microsoft Azure Exam 2024"
//                       }
//                       onChange={(e) =>
//                         setReminder({ ...reminder, course: e.target.value })
//                       }
//                     />
//                     Course: AZ-204: Developing Solutions for Microsoft Azure
//                     Exam 2024
//                   </label>

//                   <label>
//                     <input
//                       type="radio"
//                       name="course"
//                       value="None"
//                       checked={reminder.course === "None"}
//                       onChange={(e) =>
//                         setReminder({ ...reminder, course: e.target.value })
//                       }
//                     />
//                     None
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Step 2 */}
//         {step === 2 && (
//           <div>
//             <div className="step2">
//               <h6 className="frequency ">Frequency</h6>
//               <div className="frequency-options">
//                 {["Daily", "Once", "Weekly"].map((freq) => (
//                   // button as word
//                   <span
//                     key={freq}
//                     className={`frequency-btn ${
//                       reminder.frequency === freq ? "active" : ""
//                     }`}
//                     onClick={() =>
//                       setReminder({ ...reminder, frequency: freq })
//                     }
//                   >
//                     {freq}
//                   </span>
//                 ))}
//               </div>

//               <h4 className="time">Time</h4>
//               <div className="input-time">
//                 {/* <FaRegClock className="clock-icon" /> */}
//                 <input
//                   type="time"
//                   value={reminder.time}
//                   onChange={(e) =>
//                     setReminder({ ...reminder, time: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Step 3 */}
//         {step === 3 && (
//           // <div>
//           //   <label>Add to Calendar</label>
//           //   <div className="options">
//           //     {["Google", "Apple", "Outlook"].map((c) => (
//           //       <button
//           //         key={c}
//           //         className={reminder.calendar === c ? "active" : ""}
//           //         onClick={() => setReminder({ ...reminder, calendar: c })}
//           //       >
//           //         {c}
//           //       </button>
//           //     ))}
//           //   </div>
//           //   <p>Time: {reminder.time}</p>
//           // </div>
//           <div>
//             <div className="calendar-container">
//               <label className="calendar-label">Add to Calendar</label>
//               <div className="options">
//                 {[
//                   { name: "Sign in with google", icon: <FcGoogle size={20} /> },
//                   { name: "Sign in with Apple", icon: <FaApple size={20} /> },
//                   {
//                     name: "Continue with outlook",icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//   <g clip-path="url(#clip0_2349_8194)">
//     <path d="M0.00488281 2.70422V21.0704L14.109 24V0L0.00488281 2.70422ZM7.11058 16.1587C2.62695 15.8722 3.08873 7.86619 7.21525 7.80258C11.6359 8.09203 11.2022 16.0948 7.11058 16.1587ZM7.17521 9.37012C4.81312 9.53259 4.91887 14.5455 7.13878 14.5857C9.4907 14.4355 9.35258 9.40908 7.17521 9.37012ZM16.5121 12.5629C16.7251 12.718 16.9816 12.5629 16.9816 12.5629C16.7259 12.718 23.9673 7.95314 23.9673 7.95314V16.5814C23.9673 17.5207 23.3603 17.9146 22.6778 17.9146H14.9998L15.0002 11.5344L16.5121 12.5629ZM15.0006 5.08847V9.783L16.6567 10.816C16.7004 10.8286 16.795 10.8295 16.8387 10.816L23.9663 6.05564C23.9663 5.4923 23.4358 5.08847 23.1364 5.08847H15.0006Z" fill="url(#paint0_linear_2349_8194)"/>
//   </g>
//   <defs>
//     <linearGradient id="paint0_linear_2349_8194" x1="11.9861" y1="0" x2="11.9861" y2="24" gradientUnits="userSpaceOnUse">
//       <stop stop-color="#0288E7"/>
//       <stop offset="1" stop-color="#0288E7"/>
//     </linearGradient>
//     <clipPath id="clip0_2349_8194">
//       <rect width="24" height="24" fill="white"/>
//     </clipPath>
//   </defs>
// </svg>
                  
//                   },
//                 ].map((c) => (
//                   <button
//                     key={c.name}
//                     className={`calendar-btn ${
//                       reminder.calendar === c.name ? "active" : ""
//                     }`}
//                     onClick={() =>
//                       setReminder({ ...reminder, calendar: c.name })
//                     }
//                   >
//                     <div className="icon-name">
//                       <div className="icon">
//                       {c.icon} 
//                       </div>

//                       {c.name}
//                     </div>
                    
//                   </button>
//                 ))}
//               </div>

//               {/* Time Picker */}
//               <div className="time-picker-wrapper">
//                 <label className="time-label">Time:</label>
//                 <div className="time-picker">
//                   <FaRegClock className="clock-icon" />
//                   <span>{reminder.time || "12:00 AM"}</span>
//                   <input
//                     type="time"
//                     value={reminder.time}
//                     onChange={(e) =>
//                       setReminder({ ...reminder, time: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Navigation buttons */}
//         <div className="modal-actions">
//           {step > 1 && (
//             <button className="back-btn" onClick={handleBack}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="11"
//                 height="18"
//                 viewBox="0 0 11 18"
//                 fill="none"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   clip-rule="evenodd"
//                   d="M3.34299 9.00062L10.414 16.0716L8.99999 17.4856L1.22199 9.70762C1.03451 9.5201 0.929199 9.26579 0.929199 9.00062C0.929199 8.73546 1.03451 8.48115 1.22199 8.29362L8.99999 0.515625L10.414 1.92962L3.34299 9.00062Z"
//                   fill="#1E1E1E"
//                 />
//               </svg>
//             </button>
//           )}

//           <button onClick={handleNext}>{step === 3 ? "Done" : "Next"}</button>
//         </div>
// {/* button as work */}
//         <span className="close-btn" onClick={onClose}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="12"
//             height="12"
//             viewBox="0 0 12 12"
//             fill="none"
//           >
//             <path
//               d="M10.2392 11.1858L5.99917 6.93917L1.75917 11.1858L0.8125 10.2392L5.05917 5.99917L0.8125 1.75917L1.75917 0.8125L5.99917 5.05917L10.2392 0.819167L11.1792 1.75917L6.93917 5.99917L11.1792 10.2392L10.2392 11.1858Z"
//               fill="#1E1E1E"
//             />
//           </svg>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ReminderModal;


import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const ReminderModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [reminder, setReminder] = useState({
    name: "",
    course: "",
    frequency: "Daily",
    time: "12:00 AM",
    calendar: "Google",
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onSave(reminder);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative bg-white p-7 rounded-xl text-center w-[42.3125rem] shadow-lg">
        {/* Title */}
        <div className="relative mb-4">
          <h2 className="flex items-center justify-center text-black font-poppins text-xl font-medium">
            Studying reminders
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center my-4 py-8 h-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-[0.5625rem] w-[9.375rem] mx-1 rounded-lg ${
                step >= i ? "bg-[#0C316E]" : "bg-[#D9D9D9]"
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="inline-block text-left">
            <label className="block text-black font-poppins text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={reminder.name}
              onChange={(e) =>
                setReminder({ ...reminder, name: e.target.value })
              }
              placeholder="Studying reminder"
              className="flex w-[30.3125rem] h-[2.375rem] px-6 py-2 items-center gap-2 rounded border border-black bg-white text-[#595959] font-poppins text-sm outline-none"
            />

            {/* Search */}
            <div className="flex items-center border border-black mt-4 rounded relative">
              <IoSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 pl-10 py-2 rounded outline-none"
              />
            </div>

            {/* Course Options */}
            <div className="mt-4">
              <h4 className="text-[#1E1E1E] font-poppins text-sm font-medium mb-2">
                Attach Content
              </h4>
              <div className="space-y-2">
                {[
                  "Course: Data Science & Machine Learning (Theory+Projects) A-Z 90 HOURS",
                  "Course: AZ-204: Developing Solutions for Microsoft Azure Exam 2024",
                  "None",
                ].map((course) => (
                  <label key={course} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="course"
                      value={course}
                      checked={reminder.course === course}
                      onChange={(e) =>
                        setReminder({ ...reminder, course: e.target.value })
                      }
                      className="accent-[#2a4dff]"
                    />
                    <span className="text-[#1E1E1E] font-poppins text-sm font-light">
                      {course}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <h6 className="w-[29.75rem] mb-2 text-left font-medium text-[#1E1E1E]">
              Frequency
            </h6>
            <div className="inline-flex w-[29.75rem] p-2 justify-center items-center gap-5 rounded-full border border-[#8686A180] bg-white">
              {["Daily", "Once", "Weekly"].map((freq) => (
                <span
                  key={freq}
                  onClick={() => setReminder({ ...reminder, frequency: freq })}
                  className={`flex px-6 py-2 justify-center items-center gap-2 rounded-full border border-[#8686A1] shadow-md font-poppins text-base font-medium ${
                    reminder.frequency === freq
                      ? "bg-[#0C316E] text-white"
                      : "bg-white text-[#1E1E1E]"
                  }`}
                >
                  {freq}
                </span>
              ))}
            </div>

            <h4 className="w-[29.75rem] mt-2 text-left font-medium text-[#1E1E1E]">
              Time
            </h4>
            <div className="flex w-[29.75rem] mt-2">
              <input
                type="time"
                value={reminder.time}
                onChange={(e) =>
                  setReminder({ ...reminder, time: e.target.value })
                }
                className="rounded-full border border-[#8686A1] bg-white shadow-md px-4 py-2"
              />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col justify-center items-center gap-5">
            <label className="text-[#1E1E1E] font-poppins text-base font-medium">
              Add to Calendar
            </label>

            <div className="flex gap-5 flex-wrap justify-center">
              {[
                { name: "Sign in with Google", icon: <FcGoogle size={20} /> },
                { name: "Sign in with Apple", icon: <FaApple size={20} /> },
                {
                  name: "Continue with Outlook",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M0.00488281 2.70422V21.0704L14.109 24V0L0.00488281 2.70422ZM7.11058 16.1587C2.62695 15.8722 3.08873 7.86619 7.21525 7.80258C11.6359 8.09203 11.2022 16.0948 7.11058 16.1587ZM7.17521 9.37012C4.81312 9.53259 4.91887 14.5455 7.13878 14.5857C9.4907 14.4355 9.35258 9.40908 7.17521 9.37012ZM16.5121 12.5629C16.7251 12.718 16.9816 12.5629 16.9816 12.5629C16.7259 12.718 23.9673 7.95314 23.9673 7.95314V16.5814C23.9673 17.5207 23.3603 17.9146 22.6778 17.9146H14.9998L15.0002 11.5344L16.5121 12.5629ZM15.0006 5.08847V9.783L16.6567 10.816C16.7004 10.8286 16.795 10.8295 16.8387 10.816L23.9663 6.05564C23.9663 5.4923 23.4358 5.08847 23.1364 5.08847H15.0006Z"
                        fill="#0288E7"
                      />
                    </svg>
                  ),
                },
              ].map((c) => (
                <span
                  key={c.name}
                  onClick={() => setReminder({ ...reminder, calendar: c.name })}
                  className={`flex w-48 px-3 py-2 justify-center items-center gap-2 rounded-full border border-[#8686A1] shadow-md ${
                    reminder.calendar === c.name
                      ? "bg-[#0C316E] text-white"
                      : "bg-white text-[#1E1E1E]"
                  }`}
                >
                  <div className="flex justify-center items-center gap-2 text-sm font-poppins capitalize">
                    {c.icon}
                    {c.name}
                  </div>
                </span>
              ))}
            </div>

            {/* Time Picker */}
            <div className="flex items-center gap-2">
              <label className="text-[#1E1E1E] font-poppins text-base font-medium">
                Time:
              </label>
              <div className="relative flex items-center w-32 h-9 px-4 border border-[#8686A1] rounded-full shadow-md">
                <FaRegClock className="text-gray-500 text-lg" />
                <span className="ml-2 text-sm">{reminder.time}</span>
                <input
                  type="time"
                  value={reminder.time}
                  onChange={(e) =>
                    setReminder({ ...reminder, time: e.target.value })
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className=" flex justify-center items-center mt-6 relative">
          {step > 1 && (
            <span
              onClick={handleBack}
              className="absolute left-0 top-[-20.5rem] bg-none border-none cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.34299 9.00062L10.414 16.0716L8.99999 17.4856L1.22199 9.70762C1.03451 9.5201 0.929199 9.26579 0.929199 9.00062C0.929199 8.73546 1.03451 8.48115 1.22199 8.29362L8.99999 0.515625L10.414 1.92962L3.34299 9.00062Z"
                  fill="#1E1E1E"
                />
              </svg>
            </span>
          )}
          <button
            onClick={handleNext}
            className="inline-flex px-6 py-2 items-center gap-2 rounded-md bg-[#0C316E] text-white font-poppins"
          >
            {step === 3 ? "Done" : "Next"}
          </button>
        </div>

        {/* Close Button */}
        <span
          onClick={onClose}
          className="absolute top-6 right-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M10.2392 11.1858L5.99917 6.93917L1.75917 11.1858L0.8125 10.2392L5.05917 5.99917L0.8125 1.75917L1.75917 0.8125L5.99917 5.05917L10.2392 0.819167L11.1792 1.75917L6.93917 5.99917L11.1792 10.2392L10.2392 11.1858Z"
              fill="#1E1E1E"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ReminderModal;
