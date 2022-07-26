import { useState } from "react";
import subjectService from "../../services/SubjectService";

interface IProps {
  subjectIds: number[];
  onAddSubject: (subjectId: number) => void;
}
const AddSubject = ({ subjectIds, onAddSubject }: IProps) => {
  const [selectedId, setSelectedId] = useState(-1);

  return (
    <div>
      <select
        onChange={(e) => setSelectedId(parseInt(e.target.value))}
        value={selectedId}
      >
        <option key={`class-1`} value={-1}>
          Choose Subject...
        </option>
        {subjectService
          .getList()
          .filter((o) => !subjectIds.includes(o.id))
          .map((item) => (
            <option key={`class${item.id}`} value={item.id}>
              {item.description}
            </option>
          ))}
      </select>
      <button className="add-subject" onClick={() => onAddSubject(selectedId)}>
        Add
      </button>
    </div>
  );
};
export default AddSubject;
