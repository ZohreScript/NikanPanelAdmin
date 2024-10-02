import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CustomSelectBoxProps {
  options: string[]; 
  defaultOption: string; 
  onChange?: (option: string) => void; 
}

const CustomSelectBox: React.FC<CustomSelectBoxProps> = ({ options, defaultOption, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const selectBoxRef = useRef<HTMLDivElement | null>(null); 

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup the event listener
    };
  }, []);

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      {/* Select box */}
      <div
        className="bg-white text-right text-sm text-gray-600 border border-gray-300 active:border-gray-500 py-2 px-3 rounded-lg cursor-pointer min-w-32 flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaChevronUp className="text-gray-500 mr-2 text-xs" /> 
        ) : (
          <FaChevronDown className="text-gray-500 mr-2 text-xs" />  
        )}
        {selectedOption}
      </div>

      {isOpen && (
        <ul className="absolute text-sm mt-1 text-right w-full text-gray-600 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-32">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-[#e4e4f8] rounded-lg"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectBox;
