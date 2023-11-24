import { useState } from 'react';
import infoIcon from './../../assets/info-icon.svg';

function Info({ label }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-block">
      <img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        width="40px"
        src={infoIcon}
      />

      <span
        className={`absolute ${
          isHovered ? 'visible' : 'invisible'
        } bg-black bg-opacity-50 text-white text-sm w-72 py-2 px-4 rounded z-10 top-full mt-6 left-1/2 transform -translate-x-1/2`}
      >
        {label}
      </span>
    </div>
  );
}

export default Info;
