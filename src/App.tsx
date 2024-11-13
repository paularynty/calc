import React, { useContext } from "react";
import { ThemeContext } from "./utils/ThemeProvider";
import Calculator from "./components/Calculator";
import "./App.css";

function App() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext unavailable. Make sure ThemeProvider is wrapping the App component in index.tsx."
    );
  }

  const { theme, changeTheme } = themeContext;
  return (
    <div className={`App ${theme.darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="body">
        <div className="wrapper">
          <div className="title">Calculate your delivery fee</div>
          <Calculator />
          <button className="button-theme" onClick={changeTheme}>
            {theme.darkMode ? "Light" : "Dark"} mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
