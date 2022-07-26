import "./Section.css";
import { ISection } from "../../../services/SubjectService/interfaces";
import {
  MdDeleteForever,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useEffect } from "react";
import settingsService from "../../../services/SettingsService";

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
  const levels = settingsService.getLevels();

  const onChange = (partial: any) => {
    console.log(partial);
    onSectionChanged(index, Object.assign({}, section, partial));
  };

  useEffect(() => {
    if (section.comments.length < levels) {
      console.log("Array not big enough");
      section.comments.push(
        ...Array(levels - section.comments.length).fill("")
      );
      onSectionChanged(index, section);
    }
  });

  return (
    <div id={`section-${index}`} className="section">
      <div>
        <input
          value={section.name}
          onChange={(e) => onChange({ name: e.target.value })}
        ></input>
      </div>
      {section.comments.map((comment, level) => (
        <textarea
          key={`level${level}`}
          rows={5}
          value={comment}
          placeholder={`Level ${level + 1}`}
          onChange={(e) => {
            section.comments[level] = e.target.value;
            console.log("COMMENTS", section.comments);
            onChange({
              comments: section.comments,
            });
          }}
        ></textarea>
      ))}
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
