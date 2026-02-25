
export default function Testimonial() {
  return (
    <section className=" mt-8 flex w-full h-[25.625rem] px-[12.9375rem] py-[4.625rem] flex-col items-start gap-[0.625rem] shrink-0 border border-[#8686A1]/50 bg-[#5252A8] shadow-md">
      <div className="flex mx-auto justify-center items-center gap-[12.5rem] ">
        
        {/* Left Side: Testimonial */}
        <div className=" w-[33.6875rem]">
          <h4 className="text-base leading-relaxed text-[#F9FAFB] font-medium">
            CdelQGenius has been Intuit’s thought partner from the beginning of our journey offering and promoting the value of continued on-demand learning to our large workforce. Our partnership has allowed us to capitalize on employee eagerness to learn and we have seen tremendous growth and depth of skills and talent. We’re leaning heavily into learning to ensure we have the skills we need today and in the future to deliver for our customers, and Udemy is a key partner to help us get there.
          </h4>

          {/* Person Info */}
          <div className="flex items-center mt-6 space-x-3">
            <div className="w-10 h-10 rounded-full bg-white"></div>
            <div className="space-y-0">
              <span className="font-medium font-[.75rem]  text-white">Company person name</span>
              <h6 className="font-normal text-white text-[0.625rem] ">Role of the person in that company</h6>
            </div>
          </div>
        </div>

        {/* Right Side: Logo + Company */}
        <div className="flex flex-col items-center justify-center gap-[1.8875rem]">
          <div className="w-[10.625rem] h-[7.625rem] bg-gray-200 rounded-md"></div>
          <h4 className="text-[2.5rem] font-medium text-white">XYZ COMPANY</h4>
        </div>
      </div>
    </section>
  );
}
