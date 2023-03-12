import React, { useState, useRef, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { getFlagClassFromCurrencyCode } from "@/utils/getFlagClassFromCurrencyCode";

const Dropdown = ({ currencyList, name, inputValue, setInputValue }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const select = (item) => {
    setInputValue(item);

    setIsOpen((prevOpen) => !prevOpen);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative border-gray-500/50 shadow-sm inline-block m-2 text-lg">
      <div className="relative">
        <input
          value={inputValue}
          type="text"
          name="select"
          id="select"
          className="pl-2 py-1 w-14 focus:outline-none border-[1px] text-gray-500 rounded-tl-lg rounded-bl-lg"
          readOnly
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white hover:bg-gray-200 inline-block border-[1px] cursor-pointer border-l-[1px] absolute h-full w-6 rounded-tr-lg rounded-br-lg"
        >
          <button
            onClick={handleToggleDropdown}
            className="w-full h-full text-gray-500"
          >
            <AiOutlineArrowDown className="translate-x-[4px] text-sm" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div id={"dropdown-" + name} ref={dropdownRef} className="dropdown">
          <div
            id="dropdown-wrapper"
            className="flex flex-col max-h-48 overflow-y-scroll"
          >
            {currencyList &&
              Object.values(currencyList).map((currency) => (
                <button
                  key={currency.code}
                  className="text-left px-2 py-1 hover:bg-gray-200"
                  onClick={() => select(currency.code)}
                >
                  <span
                    className={getFlagClassFromCurrencyCode(currency.code)}
                  ></span>
                  <span className="ml-2">{currency.code}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// {currencyList &&
//   Object.values(currencyList).map((currency) => (
//     <div key={currency.code}>{currency.name}</div>
//   ))}

export default Dropdown;
