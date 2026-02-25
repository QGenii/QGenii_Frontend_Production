import Img1 from '../../../../assets/assets/HowDoWeIt/RealWorldInstructor/Img1.jpg'
import Img2 from '../../../../assets/assets/HowDoWeIt/RealWorldInstructor/Img2.jpg'
import Img3 from '../../../../assets/assets/HowDoWeIt/RealWorldInstructor/Img3.jpg'
import Img4 from '../../../../assets/assets/HowDoWeIt/RealWorldInstructor/Img4.jpg'
export  default function RealWorldInstructorSection4() {
    const categories = [
        {
            title: "Business Skills",
            imgAlt: "Business skills illustration",
            imgSrc: Img1
        },
        {
            title: "Tech Skills",
            imgAlt: "Tech skills illustration",
            imgSrc: Img2
        },
        {
            title: "Leadership & Management Skills",
            imgAlt: "Leadership and management illustration",
            imgSrc:     Img3
        },
        {
            title: "Wellness Skills",
            imgAlt: "Wellness skills illustration",
            imgSrc: Img4
        },
    ];


    return (
        <section className="w-full px-4 py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-6xl rounded-3xl bg-blue-50 p-6 md:p-10 lg:p-12 ring-1 ring-blue-100">
                <header className="mb-8 md:mb-12 text-center">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
                        Get instant access to 30,000+ courses
                    </h2>
                </header>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {categories.map((c, i) => (
                        <article key={i} className="flex flex-col items-center text-center w-[14.2rem] h-[19.183rem]">
                            <div className="h-48 w-full max-w-[220px] rounded-xl bg-white ring-1 ring-slate-100 shadow-sm mx-auto flex items-center justify-center overflow-hidden">
                                {/* Replace the placeholder with your illustration paths */}
                                <img src={c.imgSrc} alt={c.imgAlt} className="h-full w-full object-contain" />
                            </div>
                            <h4 className="mt-4 text-[1rem] font-semibold ">{c.title}</h4>
                            {/* work as button */}
                            <span
                                className="mt-3 inline-flex items-center justify-center rounded-[0.17rem] px-4 py-2 text-xs md:text-sm font-medium ring-1 ring-indigo-200 hover:ring-indigo-300 transition shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                                aria-label={`View courses for ${c.title}`}
                            >
                                View Courses
                            </span>
                        </article>
                    ))}
                </div>


                <div className="mt-10 flex justify-center">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center rounded-[0.17rem]  px-6 md:px-8 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-lg shadow-indigo-500/20"
                    >
                        Explore More
                    </a>
                </div>
            </div>
        </section>
    );
}