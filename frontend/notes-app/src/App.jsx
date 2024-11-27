import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Login, SignUp, Notes } from "./pages";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("mode") === "dark";
  });

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const routes = (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<Home toggleMode={toggleMode} isDarkMode={isDarkMode} />}
        />
        <Route
          path="/login"
          exact
          element={<Login toggleMode={toggleMode} isDarkMode={isDarkMode} />}
        />
        <Route
          path="/signup"
          exact
          element={<SignUp toggleMode={toggleMode} isDarkMode={isDarkMode} />}
        />
        <Route
          path="/notes"
          exact
          element={<Notes toggleMode={toggleMode} isDarkMode={isDarkMode} />}
        />
      </Routes>
    </Router>
  );

  return (
    <div className="app-body">
      <div className="app-inner-body">
        <div className="header-body">NOTES</div>

        <div className="content-body">
          <div className="content-body-overlap"></div>
          <div className="content">{routes}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
