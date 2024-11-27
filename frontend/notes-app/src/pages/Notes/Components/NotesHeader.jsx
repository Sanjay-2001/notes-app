import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoSunny, IoMoon } from "react-icons/io5";
import { getInitials } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotesHeader = ({
  toggleMode,
  isDarkMode,
  userInfo,
  handleClearSearch,
  onSearchNote,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  useEffect(() => {
    if (searchQuery === "") {
      handleClearSearch();
    }
  }, [searchQuery]);

  return (
    <div className="notes-header">
      <div className="user-body">
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search Notes"
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
          />
          {searchQuery && (
            <IoMdClose className="search-icon2" onClick={onClearSearch} />
          )}
          <FaMagnifyingGlass className="search-icon" onClick={handleSearch} />
        </div>

        <div className="user-logo" onClick={toggleMode}>
          {isDarkMode ? (
            <IoMoon className="mode-icon" />
          ) : (
            <IoSunny className="mode-icon" />
          )}
        </div>

        <div className="user-logo"> {getInitials(userInfo?.fullName)}</div>
        <div className="user-details">
          <div className="user-name">{userInfo?.fullName}</div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesHeader;
