import { useEffect, useState } from "react";
import "./Notes.css";
import NotesHeader from "./Components/NotesHeader";
import NotesCard from "./Components/NotesCard";
import { HiOutlinePlusCircle } from "react-icons/hi";
import NotesAddEdit from "./Components/NotesAddEdit";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/Toast/Toast";
import Loading from "../../components/Loading/Loading";
import { MdPostAdd } from "react-icons/md";
import { GrClear } from "react-icons/gr";

const Notes = ({ toggleMode, isDarkMode }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = ({ message, type }) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "add",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setLoading(false);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again");
      setLoading(false);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage({
          message: "Note Deleted Successfully",
          type: "delete",
        });
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage({
          message: "Note Updated Successfully",
          type: "add",
        });
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="notes-body">
      <div className="notes-header-body">
        <NotesHeader
          toggleMode={toggleMode}
          isDarkMode={isDarkMode}
          userInfo={userInfo}
          onSearchNote={onSearchNote}
          handleClearSearch={handleClearSearch}
        />
      </div>
      {allNotes?.length > 0 ? (
        <div className="notes-content-body">
          {allNotes.map((item, index) => (
            <NotesCard
              key={item._id}
              title={item?.title}
              date={item?.createdOn}
              content={item?.content}
              tags={item?.tags}
              isPinned={item?.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
        </div>
      ) : loading ? (
        <div className="loading-body">
          <Loading />
        </div>
      ) : (
        <div className="not-found-body">
          <div className="not-found-box">
            {isSearch ? (
              <GrClear className="not-found-icon" />
            ) : (
              <MdPostAdd className="not-found-icon" />
            )}
            <div className="not-found-text">
              {isSearch ? (
                <div>
                  {" "}
                  Oops! <br />
                  No notes found matching your search
                </div>
              ) : (
                <div>
                  Start creating your first note! <br />
                  Click the 'ADD' button to jot down your thoughts, ideas and
                  reminders. <br />
                  Let's get started!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="circle-body">
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
        <div className="circle-add ">
          <HiOutlinePlusCircle
            className="mode-icons"
            color={isDarkMode ? "white" : "black"}
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          />
        </div>
      </div>

      {openAddEditModal?.isShown && (
        <NotesAddEdit
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      )}
    </div>
  );
};

export default Notes;
