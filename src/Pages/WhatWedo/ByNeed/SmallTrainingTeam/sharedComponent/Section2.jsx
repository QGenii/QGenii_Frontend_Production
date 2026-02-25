import React from 'react';

const ResourceHubBanner = () => {
  return (
    <div className=" mt-10 rounded-[125.25px] bg-[linear-gradient(319deg,_#0C316E_48.28%,_#0288E7_106.13%)] flex w-[941px] h-[250px] px-[36px] py-[79px] justify-end items-center gap-[7.5px] shrink-0 mx-auto">
      {/* Icon (could be an SVG or image) */}
      <div className="w-[236.08px] h-[256.26px] shrink-0 mt-[5rem]">
       <svg xmlns="http://www.w3.org/2000/svg" width="238" height="258" viewBox="0 0 238 258" fill="none">
  <path d="M57.2347 0.873047L0.945312 24.9818L60.7368 164.591L83.9051 154.668L68.3767 46.6994L67.6567 41.688L111.851 35.3318L104.809 18.8899C95.425 21.0122 88.5687 20.83 78.1451 30.7373L74.774 33.9396L71.2972 30.8549C61.1058 21.8144 59.5814 10.2865 57.2347 0.873047ZM67.8727 1.1498C69.6969 8.35261 70.9861 14.8045 75.0597 20.0948C82.2699 14.3505 88.8112 12.0921 94.7197 10.6825C86.5719 6.36586 78.0404 3.81042 67.8727 1.1498ZM139.73 41.5519L79.1193 50.2684L100.74 200.597L121.54 197.605L134.583 88.4824L135.184 83.4559L183.607 89.244L181.021 71.2665C171.406 70.8891 164.832 68.9378 152.198 75.8093L148.114 78.0312L145.554 74.1505C138.05 62.7807 139.56 51.2522 139.73 41.5519ZM149.933 44.5709C149.831 52.0015 149.406 58.5675 151.972 64.732C160.424 61.0493 167.327 60.5611 173.399 60.7287C166.646 54.4501 159.066 49.7729 149.933 44.5709ZM144.035 94.7115L126.011 245.513L223.194 257.128L237.03 141.369C227.841 138.516 221.995 134.927 208.013 138.295L203.494 139.384L202.026 134.974C197.72 122.05 202.163 111.305 204.837 101.979L144.035 94.7115ZM213.912 107.536C211.89 114.687 209.78 120.919 210.663 127.537C219.78 126.168 226.574 127.483 232.396 129.216C227.498 121.404 221.387 114.924 213.912 107.536Z" fill="#FAFAFA"/>
</svg>
      </div>

      {/* Text + Button */}
      <div className="flex flex-col w-[34.065rem] gap-[1.25rem] justify-center items-center text-center ">
        <span className="text-[1.125rem] font-medium font-poppins text-white">
          Visit our resource hub for your growing business
        </span>
        {/* <button > */}
        <input type="button" value='Get Tools'className="rounded-[5px] border-[2.25px] border-[#0C316E] bg-white shadow-[ -0.562px_2.25px_6.75px_rgba(12,49,110,0.10)] flex items-center justify-center px-[30px] py-[7.5px] gap-[5.625px]"
        
        />
         
        {/* </button> */}
      </div>
    </div>
  );
};

export default ResourceHubBanner;
