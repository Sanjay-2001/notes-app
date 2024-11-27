import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";

const SignUp = ({ toggleMode, isDarkMode }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) && !password && !name) {
      setError("Please enter valid name, email and password.");
      return;
    } else if (!validateEmail(email) && !password) {
      setError("Please enter email and password.");
      return;
    } else if (!name && !password) {
      setError("Please enter name and password.");
      return;
    } else if (!name && !validateEmail(email)) {
      setError("Please enter name and email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //SignUp Api Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/notes");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.");
      }
    }
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <form className="login-form" onSubmit={handleSignUp}>
          <div className="form-header">SignUp</div>

          <div className="password-input">
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="password-input">
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password-input">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="input-box"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isShowPassword ? (
              <FaRegEye
                className="eye-icon"
                size={22}
                color="white"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                className="eye-icon"
                size={22}
                color="grey"
                onClick={toggleShowPassword}
              />
            )}
          </div>
          {error && <p className="error-text">{error}</p>}

          <div className="button-container">
            <button type="submit" className="btn-primary">
              Create Account
            </button>
          </div>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/signup" className="">
              Login
            </Link>
          </p>
        </form>
      </div>
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

export default SignUp;
