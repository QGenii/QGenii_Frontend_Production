import Img1 from "../../../../../assets/assets/SmallTrainingTeam/Img1.png";

export default function GoalsSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="flex flex-col justify-center items-center  w-[61.375rem] mx-auto gap-[1.25rem]">
        <h2 className="text-[1.875rem] md:text-3xl font-semibold text-gray-900  text-center md:text-left">
          Achieve your goals from the start
        </h2>
        <div className="max-w-6xl mx-auto flex justify-center gap-[2.5rem] items-center">
          {/* Left Image */}
          <div className="">
            <img
              src={Img1} // replace with your image path
              alt="Achieve goals"
              className=" w-[17.75rem] h-[15.815rem] "
            />
          </div>

          {/* Right Content */}
          <div>

            <div className="grid grid-cols-1 sm:grid-cols-2 w-[41.25rem] min-grid-cols-1  gap-[1.25rem]">
              <div className="w-[19.375rem]  ">
                <h4 className="font-semibold text-gray-900">
                  Build more confident and productive teams
                </h4>
                <h4 className="text-[#1E1E1E] text-[0.75rem]  mt-2">
                  Get unlimited access to 13,000+ top rated, in-demand courses.
                </h4>
              </div>

              <div className="w-[19.375rem]  ">
                <h4 className="font-semibold text-gray-900">
                  Innovate by staying ahead of new technologies
                </h4>
                <h4 className="text-[#1E1E1E] text-[0.75rem] mt-2">
                  Access first-to-market content taught by real-world
                  practitioners.
                </h4>
              </div>


              <div className="w-[19.375rem] ">
                <h4 className="font-semibold text-gray-900">
                  Save costs by investing in internal talent
                </h4>
                <h4 className="text-[#1E1E1E] text-[0.75rem]  mt-2">
                  Foster employee development through learning on-demand and on
                  the go.
                </h4>
              </div>

              <div className="w-[19.375rem]   ">
                <h4 className="font-semibold text-gray-900">
                  Support your employees through ongoing change
                </h4>
                <h4 className="text-[#1E1E1E] text-[0.75rem] mt-2">
                  Track learner adoption and engagement to achieve measurable
                  results.
                </h4>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
