import React from 'react';

const StudentFeedback = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white ">
        <h2 className="text-[0.875rem] font-medium text-gray-800 mb-4 flex justify-center items-center">Student Feedback</h2>

       <div className='flex gap-[1.25rem] w-[56.875rem] '>
       

        <div className="  w-[28.9375rem]  ">
          {/* Rating Bars */}
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <span className="mr-4 text-gray-700">{rating} ★</span>
              <div className="relative flex-grow h-[0.25rem] bg-gray-300 rounded-full">
                <div
                  className={`absolute top-0 left-0 h-[0.25rem] rounded-full bg-yellow-400`}
                  style={{ width: `${(rating === 5 ? 1600 : rating === 4 ? 110 : rating === 3 ? 80 : rating === 2 ? 38 : 10) / 1600 * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-gray-700">
                ({rating === 5 ? 1600 : rating === 4 ? 110 : rating === 3 ? 80 : rating === 2 ? 38 : 10})
              </span>
            </div>
          ))}
        </div>
{/* for verticle line */}
    <div className="h-32 w-px bg-gray-500 "></div>

          

         <div className=" flex justify-between items-center mb-4 ">
          <div className="flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
  <path d="M15.0131 23.8248L7.02973 28.6456C6.79514 28.7614 6.57741 28.8084 6.37655 28.7864C6.17715 28.7629 5.98288 28.694 5.79374 28.5796C5.60314 28.4623 5.45945 28.2967 5.36268 28.0826C5.26591 27.8685 5.25712 27.6347 5.33629 27.381L7.46079 18.342L0.434105 12.25C0.236171 12.0887 0.10568 11.8959 0.0426344 11.6716C-0.0204115 11.4473 -0.00648263 11.2325 0.0844207 11.0272C0.175324 10.822 0.296284 10.6533 0.447301 10.5214C0.599784 10.3938 0.80505 10.3073 1.0631 10.2619L10.3352 9.45254L13.9509 0.89296C14.0506 0.65104 14.1942 0.476563 14.3819 0.369531C14.5696 0.2625 14.78 0.208984 15.0131 0.208984C15.2462 0.208984 15.4574 0.2625 15.6465 0.369531C15.8356 0.476563 15.9786 0.65104 16.0754 0.89296L19.691 9.45254L28.9609 10.2619C29.2204 10.3059 29.4264 10.3931 29.5789 10.5236C29.7314 10.6526 29.8531 10.8205 29.944 11.0272C30.0334 11.2325 30.0466 11.4473 29.9836 11.6716C29.9205 11.8959 29.79 12.0887 29.5921 12.25L22.5654 18.342L24.6899 27.381C24.772 27.6318 24.764 27.8649 24.6657 28.0804C24.5675 28.2959 24.4231 28.4616 24.2325 28.5774C24.0448 28.6947 23.8505 28.7644 23.6497 28.7864C23.4503 28.8084 23.2333 28.7614 22.9987 28.6456L15.0131 23.8248Z" fill="#F9A21E"/>
            </svg>
          </div>

         

          <div className='flex flex-col '>
            <span className="text-xl font-semibold text-gray-800">4.7</span>
            <span className="text-gray-600 text-sm">(250 Ratings)</span>
          </div>


        </div>
        
        
            </div> 

      

        
      </div>
        {/* Search Box */}
        <div className="mt-6">
          <div className="flex items-center gap-[6rem]">

            <div className='  py-[0.625rem] px-[0.875rem] bg-[#D4EBFB] border rounded-lg '>
            <select className="  px-1  text-gray-700 bg-[#D4EBFB] border-none outline-none text-[0.75rem]">
              <option>Select Ratings</option>
              <option>1 star rating</option>
              <option>2 star rating</option>
              <option>3 star rating</option>
              <option>4 star rating</option>
              <option>5 star rating</option>
            </select>
            </div>

            <div className='flex items-center justify-center  '>
              <div className='flex items-center justify-center gap-[0.3125rem] px-[0.875rem]  py-[0.625rem]  border rounded-lg '>
                <svg className='w-[1.25rem] h-[1.25rem] aspect-auto-1/1 ' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4993 2.125C9.14387 2.12512 7.80814 2.44936 6.60353 3.07069C5.39893 3.69202 4.36037 4.59242 3.57451 5.69675C2.78866 6.80109 2.27829 8.07735 2.08599 9.41904C1.89368 10.7607 2.02503 12.129 2.46906 13.4096C2.91308 14.6902 3.65692 15.8461 4.63851 16.7807C5.6201 17.7154 6.81098 18.4018 8.11179 18.7826C9.4126 19.1634 10.7856 19.2276 12.1163 18.9699C13.447 18.7122 14.6967 18.14 15.7613 17.301L19.4133 20.953C19.6019 21.1352 19.8545 21.236 20.1167 21.2337C20.3789 21.2314 20.6297 21.1262 20.8151 20.9408C21.0005 20.7554 21.1057 20.5046 21.108 20.2424C21.1102 19.9802 21.0094 19.7276 20.8273 19.539L17.1753 15.887C18.1633 14.6336 18.7784 13.1274 18.9504 11.5407C19.1223 9.95405 18.8441 8.35102 18.1475 6.91509C17.4509 5.47917 16.3642 4.26836 15.0116 3.42123C13.659 2.57411 12.0952 2.12489 10.4993 2.125ZM3.99928 10.625C3.99928 8.90109 4.6841 7.24779 5.90308 6.02881C7.12207 4.80982 8.77537 4.125 10.4993 4.125C12.2232 4.125 13.8765 4.80982 15.0955 6.02881C16.3145 7.24779 16.9993 8.90109 16.9993 10.625C16.9993 12.3489 16.3145 14.0022 15.0955 15.2212C13.8765 16.4402 12.2232 17.125 10.4993 17.125C8.77537 17.125 7.12207 16.4402 5.90308 15.2212C4.6841 14.0022 3.99928 12.3489 3.99928 10.625Z" fill="#1E1E1E"/>
</svg>
            <input
              type="text"
              className="border    rounded-md w-[28.3rem] text-[0.65rem] border-none outline-none"
              placeholder="Search questions here"
            />
            </div>
            <button className="ml-4 bg-blue-600 text-white p-2 rounded-md">Search</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default StudentFeedback;
