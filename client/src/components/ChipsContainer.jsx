import { useState } from 'react';
import Chip from './Chip';

const ChipsContainer = ({ chips, onChipClick, maxVisibleChips = 5 }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleChips = expanded ? chips : chips.slice(0, maxVisibleChips);
  const showExpandButton = chips.length > maxVisibleChips;
  return (
    <div className="flex justify-between mt-2">
      <div className="flex flex-wrap">
        {visibleChips.map((chip, index) => (
          <Chip key={index} text={chip} onClick={onChipClick} />
        ))}
      </div>
      {showExpandButton && (
        <div
          onClick={() => setExpanded(!expanded)}
          className="text-center my-auto mt-2 mr-1 text-xs cursor-pointer text-gray-600 hover:text-gray-800"
        >
          {expanded ? (
            <p className="w-16 text-center">See Less &#x25B2;</p>
          ) : (
            <p>See more suggestion &#x25BC;</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChipsContainer;
