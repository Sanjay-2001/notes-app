import { formatDate } from "../../../utils/helper";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NotesCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="card-body">
      <div className="card-header">
        <div className="card-title">{title}</div>
        <MdOutlinePushPin
          className={`pin-icon ${isPinned ? "pin-primary" : "pin-secondary"}`}
          onClick={onPinNote}
        />
      </div>
      <div className="card-date">{formatDate(date)}</div>
      <div className="card-content">{content?.slice(0, 60)}</div>
      <div className="card-bottom">
        <div className="card-tags-body">
          {tags.map((item) => (
            <div>{`#${item} `}</div>
          ))}
        </div>
        <div className="icon-box">
          <MdCreate className="edit-icon" onClick={onEdit} />
          <MdDelete className="delete-icon" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
