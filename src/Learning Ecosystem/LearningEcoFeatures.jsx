// src/components/Features.js
import { 
  Sun, 
  Layers, 
  Star, 
  FileText, 
  Users, 
  Globe, 
  BookOpen, 
  Compass 
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    id:1,
    icon: <Sun className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Intuitive user interface and 24/7 access",
    description:
      "Learners love our easy-to-use, engaging UI and round-the-clock course access.",
  },
  {
    id:2,
    icon: <Layers className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Seamless systems integration",
    description:
      "We fit right into your existing systems, so employees know where to go when they’re ready to learn..",
  },
  {
    id:3,
    icon: <Star className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Top-rated courses",
    description:
      "High marks all around: our courses have an average learner review score of 4.5 out of 5..",
  },
  {
    id:4,
    icon: <FileText className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Current, relevant content",
    description:
      "Employees learn practical skills from courses taught by thought leaders, authors, executive coaches, professors, and more..",
  },
  {
        id:5,
    icon: <Users className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Instruction from real-world experts",
    description:
      "Employees learn practical skills from courses taught by thought leaders, authors, executive coaches, professors, and more.",
  },
  {
    id:6,
    icon: <Globe className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Localized learning",
    description:
      "Courses from our International Collection are taught by native instructors in their native languages — no dubbing or captions.",
  },
  {
        id:7,
    icon: <BookOpen className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Many ways to learn",
    description:
      "From on-demand courses to hands-on practice to cohort programs and more, we've got you covered.",
  },
  {
    id:8,
    icon: <Compass className="w-[3rem] h-[3rem] aspect-square text-black" />,
    title: "Custom learning paths",
    description:
      "Create a personalized journey for a process (such as onboarding), a team, or a particular learner by selecting the exact courses and resources you want in the order you want.",
  },
];

export default function LearningEcoFeatures() {

    const [learn, setlearn] = useState(false)

  return (
    <section className=" mt-[5rem]  mx-auto  w-[75.185rem]  flex items-center justify-center flex-col gap-7">
      <h2 className="text-2xl  font-medium text-center ">
        Inspired learning. Inspired employees.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  ">
        {features.map((feature) => (
        <div  key={feature.id} className="flex w-[17.875rem] flex-col items-start gap-[3.75rem] self-stretch py-8 ">
          <div  className="flex flex-col items-start gap-2  ">
            {feature.icon}
            <span className="font-medium text-[ 0.9375rem] w-[16.875rem]">{feature.title}</span>
            <span className="text-[0.65625rem] font-normal w-[15.5625rem] ">{feature.description}</span>
            {  !learn && feature.title ==="Localized learning"  && <span className="text-[0.65625rem] font-normal text-[color:var(--Brand-Color,#0C316E)] font-poppins  not-italic leading-normal underline">Learn More</span>}
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}
