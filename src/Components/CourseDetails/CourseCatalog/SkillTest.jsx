import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import api from '../../../lib/api';
// import { set } from 'mongoose';

// const testData = [
//     {
//         section: 'Basic Programming',
//         tests: [
//             { title: 'Python test', level: 'Beginner', questions: 20, duration: '20 min' },
//             { title: 'Java test', level: 'Beginner', questions: 20, duration: '20 min' },
//             { title: 'C++ test', level: 'Beginner', questions: 20, duration: '20 min' },
//             { title: 'C test', level: 'Beginner', questions: 20, duration: '20 min' },
//             { title: 'SQL test', level: 'Beginner', questions: 20, duration: '15 min' },
//             { title: 'Java script test', level: 'Beginner', questions: 20, duration: '20 min' },
//         ],
//     },
//     {
//         section: 'Core CS',
//         tests: [
//             { title: 'Operating System test', level: 'Beginner', questions: 20, duration: '25 min' },
//             { title: 'Computer Networking system', level: 'Beginner', questions: 20, duration: '20 min' },
//         ],
//     },
//     {
//         section: 'Data Structure and Algorithms',
//         tests: [
//             { title: 'DSA test in python', level: 'Beginner', questions: 20, duration: '25 min' },
//             { title: 'DSA test in javascript', level: 'Beginner', questions: 20, duration: '25 min' },
//             { title: 'DSA test in c', level: 'Beginner', questions: 20, duration: '25 min' },
//             { title: 'DSA test in c++', level: 'Beginner', questions: 20, duration: '25 min' },
//             { title: 'Advanced DSA c test', level: 'Advanced', questions: 30, duration: '30 min' },
//             { title: 'Advanced DSA c++ test', level: 'Advanced', questions: 30, duration: '30 min' },
//             { title: 'Advanced DSA java test', level: 'Advanced', questions: 30, duration: '30 min' },
//         ],
//     },
//     {
//         section: 'Advanced Programming',
//         tests: [
//             { title: 'Advanced c++ test', level: 'Advanced', questions: 30, duration: '30 min' },
//             { title: 'Advanced java test', level: 'Advanced', questions: 30, duration: '30 min' },
//         ],
//     },
// ];



export default function  SkillTest() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getSkills = async()=>{
            try{
                const resp = await api.get('/skills');
                console.log('Skills data:', resp.data);
                setSkills(resp.data.data || []);
            }catch(err){
                console.error('Error fetching skills:', err);
                setSkills([]);
            } finally {
                setLoading(false);
            }
        }
        getSkills();
    },[]);

    // Calculate duration based on question count (approximately 1 minute per question)
    const calculateDuration = (questionCount) => {
        if (questionCount === 0) return '0 min';
        const minutes = Math.max(10, Math.ceil(questionCount * 1.2)); // At least 10 min, ~1.2 min per question
        return `${minutes} min`;
    };

    // Determine level based on question count or default to Beginner
    const getLevel = (questionCount) => {
        if (questionCount === 0) return 'Beginner';
        if (questionCount <= 10) return 'Beginner';
        if (questionCount <= 20) return 'Intermediate';
        return 'Advanced';
    };

    if (loading) {
        return (
            <div className="w-full">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Skill Tests</h1>
                <p className="text-gray-600 mb-6 text-base max-w-2xl">Loading skills...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Skill Tests</h1>
            <p className="text-gray-600 mb-6 text-base max-w-2xl">
                Test your knowledge in various programming skills. Get instant results and personalized recommendations to improve your coding skills. Start your tech career journey today!
            </p>

            {skills.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No skill tests available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {skills.map((skill) => {
                        const questionCount = skill.questions?.length || 0;
                        const level = getLevel(questionCount);
                        const duration = calculateDuration(questionCount);
                        
                        return (
                            <div
                                key={skill._id}
                                className="border border-indigo-400 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition relative"
                            >
                                {/* Icon and Badge */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="bg-[#DBEEFB] p-3 rounded-lg">
                                        <img
                                            src="teenyicons_certificate-solid.png"
                                            alt="test icon"
                                            className="w-8 h-8"
                                        />
                                    </div>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-md ${
                                            level === 'Beginner'
                                                ? 'bg-[#5F7FBD] text-[#f1f1f1]'
                                                : level === 'Intermediate'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-purple-100 text-purple-600'
                                        }`}
                                    >
                                        {level}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-gray-800 text-base mb-1 leading-tight capitalize">
                                    {skill.skillName} Test
                                </h3>

                                {/* Description */}
                                {skill.description && (
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {skill.description}
                                    </p>
                                )}

                                {/* Meta Info */}
                                <p className="text-sm text-gray-500 mb-4">
                                    {questionCount} {questionCount === 1 ? 'question' : 'questions'} | {duration}
                                </p>

                                {/* Button */}
                                <button 
                                    className="bg-blue-900 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md w-full" 
                                    onClick={() => {
                                        navigate(`/practicetests/${skill.skillName.toLowerCase()}`)
                                    }}
                                    disabled={questionCount === 0}
                                >
                                    {questionCount === 0 ? 'No Questions Yet' : 'Take a Test'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
