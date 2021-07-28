import React, { useState } from 'react';

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

  const handleClick = () => {
    setDarkMode(!darkMode);
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