import React from 'react';
import Select from 'react-select';

const LanguageSelector = ({ language, setLanguage, theme }) => {
  const options = [
    { value: 'nodejs', label: 'NodeJS' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' }
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: '20px',
      minHeight: '35px', 
      borderRadius: '8px',
      backgroundColor: theme === 'dark' ? '#374151' : '#fff',
      borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
      color: theme === 'dark' ? '#fff' : '#000',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '30px', 
      padding: '0 8px', 
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#fff' : '#000',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#374151' : '#fff',
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? (theme === 'dark' ? '#4B5563' : '#D1D5DB') : (theme === 'dark' ? '#374151' : '#fff'),
      color: theme === 'dark' ? '#fff' : '#000',
    }),
  };

  return (
    <div className="mb-4 w-full md:w-1/4">
      <Select
        value={options.find(option => option.value === language)}
        onChange={(selectedOption) => setLanguage(selectedOption.value)}
        options={options}
        styles={customStyles}
      />
    </div>
  );
};

export default LanguageSelector;
