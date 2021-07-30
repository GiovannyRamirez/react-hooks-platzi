import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const styles = {
  Header: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-evenly",
  },
  Button: {
    height: "32px",
    width: "85px",
  },
};

const Header = () => {

  const [darkMode, setDarkMode] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
    if (theme === "LightMode") {
      setTheme("DarkMode");
      return;
    }
    setTheme("LightMode");
  }

  return (
    <div className="Header" style={styles.Header}>
      <h1>Rick and Morty</h1>
      <button
        className="Button"
        style={styles.Button}
        type="button"
        onClick={handleClick}
      >
        {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default Header;