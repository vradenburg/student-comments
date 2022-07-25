import "./Section.css";
import { ISection } from "../../../services/SubjectService/interfaces";
import {
  MdDeleteForever,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";

interface IProps {
  index: number;
  section: ISection;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSectionChanged: (index: number, section: ISection) => void;
  onSectionDeleted: (index: number) => void;
  onSectionMoved: (index: number, isDown: boolean) => void;
}

const Section = ({
  index,
  section,
  canMoveUp,
  canMoveDown,
  onSectionChanged,
  onSectionDeleted,
  onSectionMoved,
}: IProps) => {
  const onChange = (partial: any) => {
    onSectionChanged(index, Object.assign({}, section, partial));
  };

  return (
    <div id={`section-${index}`} className="section">
      <div>
        <input
          value={section.name}
          onChange={(e) => onChange({ name: e.target.value })}
        ></input>
      </div>
      <textarea
        rows={5}
        value={section.comments.level1}
        placeholder="Level 1"
        onChange={(e) =>
          onChange({
            comments: Object.assign({}, section.comments, {
              level1: e.target.value,
            }),
          })
        }
      ></textarea>
      <textarea
        rows={5}
        value={section.comments.level2}
        placeholder="Level 2"
        onChange={(e) =>
          onChange({
            comments: Object.assign({}, section.comments, {
              level2: e.target.value,
            }),
          })
        }
      ></textarea>
      <textarea
        rows={5}
        value={section.comments.level3}
        placeholder="Level 3"
        onChange={(e) =>
          onChange({
            comments: Object.assign({}, section.comments, {
              level3: e.target.value,
            }),
          })
        }
      ></textarea>
      <textarea
        rows={5}
        value={section.comments.level4}
        placeholder="Level 4"
        onChange={(e) =>
          onChange({
            comments: Object.assign({}, section.comments, {
              level4: e.target.value,
            }),
          })
        }
      ></textarea>
      <div className="actions">
        <button className="delete" onClick={() => onSectionDeleted(index)}>
          <MdDeleteForever />
        </button>
        <button
          onClick={() => onSectionMoved(index, false)}
          disabled={!canMoveUp}
        >
          <MdKeyboardArrowUp />
        </button>
        <button
          onClick={() => onSectionMoved(index, true)}
          disabled={!canMoveDown}
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
    </div>
  );
};
export default Section;
