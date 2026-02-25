import React from "react";




const PREVIEW_IMG = "/mnt/data/d69e8ab8-4cf9-4e88-b4c0-06ff2236ab31.png";

export default function CertificateOfParticipant() {
    return (
        <div>


            <div className="min-h-screen bg-white px-6 py-10">
                <h1 className="text-center text-2xl font-semibold mb-10">
                    Certificate of Participation
                </h1>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Description */}
                    <h4 className="text-gray-600 leading-relaxed text-sm">
                        All about the certification, All about the certification, All about the
                        certification,All about the certificationAll about the certificationAll
                        about the certificationAll about the certificationAll about the
                        certificationAll about the certificationAll about the certification,
                        All about the certification, All about the certification, All about the
                        certification,All about the certificationAll about the
                        certificationAll about the certificationAll about the certificationAll
                        about the certificationAll about the certificationAll about the
                        certificationAll about the certificationAll about the certificationAll
                        about the certification
                    </h4>

                    {/* Certificate Preview */}
                    <div className="w-full h-[350px] bg-gray-100 rounded-2xl overflow-hidden shadow border">
                        <img
                            src={PREVIEW_IMG}
                            alt="certificate preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="max-w-6xl mx-auto mt-12 flex justify-end gap-4">
                    <button className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-5 py-3 rounded-xl shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.927 9.99C14.317 9.082 8.617 13.99 9 20.5M6.5 8C6.5 8.53043 6.71071 9.03914 7.08579 9.41421C7.46086 9.78929 7.96957 10 8.5 10C9.03043 10 9.53914 9.78929 9.91421 9.41421C10.2893 9.03914 10.5 8.53043 10.5 8C10.5 7.46957 10.2893 6.96086 9.91421 6.58579C9.53914 6.21071 9.03043 6 8.5 6C7.96957 6 7.46086 6.21071 7.08579 6.58579C6.71071 6.96086 6.5 7.46957 6.5 8Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 13.0657C5.78 12.6807 8.275 14.0237 9.624 16.1657" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 9.4C3 7.16 3 6.04 3.436 5.184C3.81949 4.43139 4.43139 3.81949 5.184 3.436C6.04 3 7.16 3 9.4 3H14.6C16.84 3 17.96 3 18.816 3.436C19.5686 3.81949 20.1805 4.43139 20.564 5.184C21 6.04 21 7.16 21 9.4V14.6C21 16.84 21 17.96 20.564 18.816C20.1805 19.5686 19.5686 20.1805 18.816 20.564C17.96 21 16.84 21 14.6 21H9.4C7.16 21 6.04 21 5.184 20.564C4.43139 20.1805 3.81949 19.5686 3.436 18.816C3 17.96 3 16.84 3 14.6V9.4Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Download Image
                    </button>

                    <button className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-5 py-3 rounded-xl shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7.79297 21.25H16.209C17.1372 21.25 18.0275 20.8813 18.6838 20.2249C19.3402 19.5685 19.709 18.6783 19.709 17.75V12.22C19.7093 11.2919 19.341 10.4016 18.685 9.745L12.716 3.775C12.3909 3.45 12.0051 3.19221 11.5804 3.01634C11.1558 2.84047 10.7006 2.74997 10.241 2.75H7.79297C6.86471 2.75 5.97447 3.11875 5.3181 3.77513C4.66172 4.4315 4.29297 5.32174 4.29297 6.25V17.75C4.29297 18.6783 4.66172 19.5685 5.3181 20.2249C5.97447 20.8813 6.86471 21.25 7.79297 21.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.6875 3.10938V8.76938C11.6875 9.29981 11.8982 9.80852 12.2733 10.1836C12.6484 10.5587 13.1571 10.7694 13.6875 10.7694H19.3495" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.25 16.5V15.5M7.25 15.5V13.5H8.25C8.51522 13.5 8.76957 13.6054 8.95711 13.7929C9.14464 13.9804 9.25 14.2348 9.25 14.5C9.25 14.7652 9.14464 15.0196 8.95711 15.2071C8.76957 15.3946 8.51522 15.5 8.25 15.5H7.25ZM15.25 16.5V15.25M15.25 15.25V13.5H16.75M15.25 15.25H16.75M11.25 16.5V13.5H11.75C12.1478 13.5 12.5294 13.658 12.8107 13.9393C13.092 14.2206 13.25 14.6022 13.25 15C13.25 15.3978 13.092 15.7794 12.8107 16.0607C12.5294 16.342 12.1478 16.5 11.75 16.5H11.25Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Download PDF
                    </button>

                    <div className="flex items-center justify-center bg-[#CBBBFF] hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-full shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                            <path d="M5.47675 9.28525C5.47675 9.91672 5.2259 10.5223 4.77938 10.9688C4.33287 11.4154 3.72726 11.6662 3.0958 11.6662C2.46433 11.6662 1.85872 11.4154 1.41221 10.9688C0.965693 10.5223 0.714844 9.91672 0.714844 9.28525C0.714844 8.65378 0.965693 8.04818 1.41221 7.60166C1.85872 7.15515 2.46433 6.9043 3.0958 6.9043C3.72726 6.9043 4.33287 7.15515 4.77938 7.60166C5.2259 8.04818 5.47675 8.65378 5.47675 9.28525Z" stroke="#1E1E1E" stroke-width="1.42857" />
                            <path d="M10.2385 4.04492L5.47656 7.37826M10.2385 14.5211L5.47656 11.1878" stroke="#1E1E1E" stroke-width="1.42857" stroke-linecap="round" />
                            <path d="M15.0002 15.4767C15.0002 16.1082 14.7493 16.7138 14.3028 17.1603C13.8563 17.6069 13.2507 17.8577 12.6192 17.8577C11.9878 17.8577 11.3822 17.6069 10.9356 17.1603C10.4891 16.7138 10.2383 16.1082 10.2383 15.4767C10.2383 14.8453 10.4891 14.2397 10.9356 13.7932C11.3822 13.3466 11.9878 13.0958 12.6192 13.0958C13.2507 13.0958 13.8563 13.3466 14.3028 13.7932C14.7493 14.2397 15.0002 14.8453 15.0002 15.4767ZM15.0002 3.0958C15.0002 3.72726 14.7493 4.33287 14.3028 4.77938C13.8563 5.2259 13.2507 5.47675 12.6192 5.47675C11.9878 5.47675 11.3822 5.2259 10.9356 4.77938C10.4891 4.33287 10.2383 3.72726 10.2383 3.0958C10.2383 2.46433 10.4891 1.85872 10.9356 1.41221C11.3822 0.965693 11.9878 0.714844 12.6192 0.714844C13.2507 0.714844 13.8563 0.965693 14.3028 1.41221C14.7493 1.85872 15.0002 2.46433 15.0002 3.0958Z" stroke="#1E1E1E" stroke-width="1.42857" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
