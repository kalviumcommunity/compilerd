import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center font-bold py-2 px-4"
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} color={theme==='light'?'black':'white'} style={{ fontSize: '1.5em' }}/>
    </button>
  );
};

export default ThemeToggle;


