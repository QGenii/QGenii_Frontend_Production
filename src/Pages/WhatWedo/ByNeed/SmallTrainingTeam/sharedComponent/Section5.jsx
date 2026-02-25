import Img2 from "../../../../../assets/assets/SmallTrainingTeam/Img2.png";
import Img3 from "../../../../../assets/assets/SmallTrainingTeam/Img3.png";


export default function LearningSolution() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
          The complete learning solution for teams
        </h2>

        {/* Two Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Block 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src={Img2} // replace with your image path
              alt="Drive learning outcomes"
              className="max-w-xs mb-6"
            />
            <hh4 className="font-semibold text-gray-900 text-[1rem]">
              Drive learning outcomes with reporting and insights
            </hh4>
            <h4 className="text-gray-600  font-normal text-[0.875rem] mt-2">
              Our built-in user adoption funnel is intuitive, actionable, and ideal for small
              teams. Understand and take action on overall user adoption, and see which courses
              individual users are learning from.
            </h4>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col items-center text-center ">
            <img
              src={Img3} // replace with your image path
              alt="Personalized learning"
              className="max-w-xs mb-6"
            />

            <div className="w-[rem]"                                                            >
              <h4 className="font-semibol text-gray-900 text-[1rem]">
                Personalized learning for your entire team
              </h4>
              <h4 className="text-black text-[0.875rem] font-normal mt-2">
                Our content recommendations take the guesswork out of which skills to master next.
                Learners and admins can also recommend courses to help your team start sharing and
                socializing learning in no time.
              </h4>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
