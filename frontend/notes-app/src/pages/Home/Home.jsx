import React from "react";
import "./Home.css";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Home = ({ toggleMode, isDarkMode }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="home-body">
      <div className="home-content">
        "Capture Your Thoughts, Organize Your Life."
      </div>
      <button className="note-btn" onClick={handleNavigate}>
        Get Started
      </button>

      <div className="circle" onClick={toggleMode}>
        {isDarkMode ? (
          <CiDark className="mode-icons" color="white" />
        ) : (
          <CiLight className="mode-icons" />
        )}
      </div>
    </div>
  );
};

export default Home;
