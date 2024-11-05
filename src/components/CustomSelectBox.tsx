import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CustomSelectBoxProps {
  options: (string | { label: string; value: number })[];
  defaultOption: string;
  onChange?: (option: string | number | null) => void;
}

const CustomSelectBox: React.FC<CustomSelectBoxProps> = ({ options, defaultOption, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: string | { label: string; value: number }) => {
    const selectedValue = typeof option === 'string' ? option : option.value;
    setSelectedOption(typeof option === 'string' ? option : option.label);
    setIsOpen(false);
    if (onChange) onChange(selectedValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={selectBoxRef}>
      <div
        className="bg-white text-right text-[10px] md:text-sm text-gray-600 border border-gray-300 py-2 px-3 rounded-lg cursor-pointer min-w-32 flex items-center justify-between"
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
        <ul className="absolute  text-[10px] md:text-sm mt-1 text-right w-full text-gray-600 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-32">
          {(options as (string | { label: string; value: number })[]).map((option) => (
            <li
              key={typeof option === 'string' ? option : option.value}
              onClick={() => handleOptionClick(option)}
              className="px-4 text-[10px] md:text-sm py-2 hover:bg-gray-100 cursor-pointer"
            >
              {typeof option === 'string' ? option : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectBox;
