
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import ClockTime from '../assets/MyStuding/ClockTime.png'
const LearningTool = () => {




  return (


    <div>
      <div className=" flex flex-col items-start gap-[1.25rem]">
        <h4 className="text-[1rem] font-medium font-poppins ">Studying reminders</h4>
        <h4 className="text[.75rem] font-normal font-poppins">Set up push notifications or calendar events to stay on track for your learning goals.</h4>


        <button>
          <Link to="/mystudying" className="flex items-center justify-center gap-2"
            state={{ openReminder: true }}
          ><IoIosAddCircleOutline />
            Add Reminder</Link>
        </button>


      </div >
      <div className=" flex justify-end">
        <img src={ClockTime} className='w-[16.6875rem] h-[11.125rem] shrink-0 aspect-[3/2]' alt="" />
      </div>
    </div>
  )
}

export default LearningTool