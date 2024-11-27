import { MdClose } from "react-icons/md";
import TagInput from "./TagInput";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const NotesAddEdit = ({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage({ message: "Note Added Successfully", type: "add" });
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage({ message: "Note Updated Successfully", type: "add" });
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data & error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title && !content) {
      setError("Please enter title and content");
      return;
    }
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="addEdit-body">
      <div className="addEdit-box">
        <button className="close-btn" onClick={onClose}>
          <MdClose />
        </button>
        <div className="input-box-body">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="form-input-box"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-box-body">
          <label className="input-label">CONTENT</label>
          <textarea
            type="text"
            className="form-input-box"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="input-box-body">
          <label className="input-label">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div className="form-btn-body" onClick={handleAddNote}>
          <button className="btn-primary">
            {type === "edit" ? "UPDATE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesAddEdit;
