import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag-main-body">
      {tags?.length > 0 && (
        <div className="tags-content">
          {tags.map((tag, index) => (
            <span key={index} className="tags">
              #{tag}
              <button
                className="tag-close-btn"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="tag-input-body">
        <input
          type="text"
          value={inputValue}
          className="form-input-box"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addNewTag} className="tag-add-btn">
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
