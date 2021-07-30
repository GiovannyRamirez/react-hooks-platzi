import React, { useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import Header from './components/Header';
import ThemeContext from './context/ThemeContext';

function App() {

  const [theme, setTheme] = useState("LightMode");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <div className="App">
          <Header />
          <Characters />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
