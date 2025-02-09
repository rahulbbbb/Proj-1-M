import React, { useRef } from "react";
import { CloseSmallIcon } from "@/components/Icons";
import { SearchIcon2 } from "@/components/Icons";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCrossClick?: () => void;
  className?: string; // Add className prop
}

const SearchBar = ({ value, onChange, handleCrossClick, className }: SearchBarProps) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className={`search  ${className}`}> {/* Apply className here */}
      <button className="">
        {value && value?.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (handleCrossClick) handleCrossClick();
              handleFocus();
            }}
          >
            <CloseSmallIcon className="w-4" />
          </button>
        ) : (
          <SearchIcon2 />
        )}
      </button>
      <input
        ref={inputRef}
        id="search"
        type="text"
        className="border-none shadow-none focus:outline-none search-input focus:shadow-none ring-0 focus:ring-0 font-normal pr-3"
        placeholder="Search Psychologists..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;