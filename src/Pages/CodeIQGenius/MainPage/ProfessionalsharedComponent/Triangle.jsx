const triangleColors = {
  short: {
    left: "#00008B",    // Blue
    bottom: "#FFB800",  // Orange
    right: "#D3D3D3",   // Gray
  },
  expertise: {
    left: "#FF69B4",    // Pink
    right: "#00008B",   // Blue
    bottom: "#D3D3D3",  // Gray
  },
  resources: {
    left: "#D3D3D3",    // Gray
    bottom: "#00B050",  // Green
    right: "#00008B",   // Blue
  },
};

const Triangle = ({ active }) => {
  const { left, right, bottom } = triangleColors[active];

  return (
    <div className="relative w-72 h-72 flex items-center justify-center bg-emerald-200 ">
      <svg
        viewBox="0 0 300 260"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Left side */}
        <line
          x1="150"
          y1="10"
          x2="10"
          y2="250"
          stroke={left}
          strokeWidth="12"
          strokeLinecap="round"
          className="rounded-2xl"
        />
        {/* Right side */}
        <line
          x1="150"
          y1="10"
          x2="290"
          y2="250"
          stroke={right}
          strokeWidth="12"
          strokeLinecap="round"
          className="rounded-2xl"
        />
        {/* Bottom side */}
        <line
          x1="10"
          y1="250"
          x2="290"
          y2="250"
          stroke={bottom}
          strokeWidth="12"
          strokeLinecap="round"
          className="rounded-2xl"
        />
      </svg>

      {/* Center text */}
      <div className="absolute  text-[1rem] bottom-[6rem] text-center bg-amber-300 ">
        
        <div className=" h-[3rem]">Professional <br /> Services</div>
      </div>
    </div>
  );
};

export default Triangle;
