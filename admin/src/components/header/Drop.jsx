import React, { useState } from 'react';
import "../../App.css"
const App = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // Store the selected option here

  const options = [
    { value: "fruit", label: "View Profile" },
    { value: "vegetable", label: "logout" },
    // { value: "meat", label: "Meat" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <div>
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-6073860-4996977.png"
        alt="Click to open dropdown"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
        style={{height:"50px",width:"50px"}}
      />
      {isDropdownVisible && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
};

export default App;