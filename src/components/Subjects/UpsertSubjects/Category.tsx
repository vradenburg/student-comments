import "./Category.css";
import { ICategory } from "../../../services/SubjectService/interfaces";
import {
  MdDeleteForever,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { useEffect } from "react";
import settingsService from "../../../services/SettingsService";
import AutoCompleteTextArea from "./AutoComplete";

interface IProps {
  index: number;
  category: ICategory;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onCategoryChanged: (index: number, category: ICategory) => void;
  onCategoryDeleted: (index: number) => void;
  onCategoryMoved: (index: number, isDown: boolean) => void;
}

const Category = ({
  index,
  category,
  canMoveUp,
  canMoveDown,
  onCategoryChanged,
  onCategoryDeleted,
  onCategoryMoved,
}: IProps) => {
  const levels = settingsService.getLevels();

  const onChange = (partial: any) => {
    console.log(partial);
    onCategoryChanged(index, Object.assign({}, category, partial));
  };

  useEffect(() => {
    if (category.comments.length < levels) {
      console.log("Array not big enough");
      category.comments.push(
        ...Array(levels - category.comments.length).fill("")
      );
      onCategoryChanged(index, category);
    }
  });

  return (
    <div id={`category-${index}`} className="category">
      <div>
        <input
          value={category.name}
          onChange={(e) => onChange({ name: e.target.value })}
        ></input>
      </div>
      {category.comments.map((comment, level) => (
        <AutoCompleteTextArea
          category={category}
          comment={comment}
          level={level}
          onChange={onChange}
        ></AutoCompleteTextArea>
      ))}
      <div className="actions">
        <button className="delete" onClick={() => onCategoryDeleted(index)}>
          <MdDeleteForever />
        </button>
        <button
          onClick={() => onCategoryMoved(index, false)}
          disabled={!canMoveUp}
        >
          <MdKeyboardArrowUp />
        </button>
        <button
          onClick={() => onCategoryMoved(index, true)}
          disabled={!canMoveDown}
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
    </div>
  );
};
export default Category;
