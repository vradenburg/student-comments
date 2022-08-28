import "./index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import subjectService from "../../../services/SubjectService";
import { ICategory } from "../../../services/SubjectService/interfaces";
import Category from "./Category";
import { MdOutlineAdd } from "react-icons/md";

const UpsertSubjects = () => {
  const { id: idString } = useParams();
  const isCreateMode = !idString;

  const id: number | undefined = isCreateMode ? undefined : parseInt(idString);

  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (!isCreateMode && !isInitialized) {
      console.log("Initialize");
      setIsInitialized(true);
      const result = subjectService.getById(id);
      if (result) {
        setDescription(result.description);
        setCategories(result.categories);
        setCanSave(false);
      }
    }
  }, [id, isCreateMode, isInitialized]);

  const onDescriptionChanged = (description: string) => {
    setDescription(description);
    setCanSave(true);
  };

  const onCategoryChanged = (index: number, section: ICategory) => {
    const updatedCategories = Array.from(categories);
    updatedCategories[index] = section;
    setCategories(updatedCategories);
    setCanSave(true);
  };
  const onCategoryDeleted = (index: number) => {
    const updatedCategories = Array.from(categories);
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
    setCanSave(true);
  };

  const onCategoryMoved = (index: number, isDown: boolean) => {
    let newIndex = isDown ? index + 1 : index - 1;
    if (newIndex < 0) newIndex = 0;
    const updatedCategories = Array.from(categories);
    if (newIndex > updatedCategories.length)
      newIndex = updatedCategories.length;
    const [item] = updatedCategories.splice(index, 1);
    updatedCategories.splice(newIndex, 0, item);
    setCategories(updatedCategories);
    setCanSave(true);
  };

  const addCategory = () => {
    const updatedCategories = Array.from(categories || []);
    updatedCategories.push({
      name: sectionName,
      comments: [],
    });
    setCategories(updatedCategories);
    setCanSave(true);
    setSectionName("");
  };

  const saveButtonClicked = () => {
    const itemId = subjectService.save(id, {
      description,
      categories,
    });
    if (isCreateMode) {
      window.location.href = `#/subject/${itemId}/edit`;
    } else {
      setCanSave(false);
    }
  };

  return (
    <div>
      <h2>
        <a href="#/subjects">Subjects</a> \{" "}
        {isCreateMode ? "Add New" : "Update"} Subject
      </h2>

      <div className="form">
        <div className="form-row">
          <input
            placeholder="Description (e.g. Term 3 Math Comments)"
            onChange={(e) => onDescriptionChanged(e.target.value)}
            value={description}
          ></input>
        </div>

        <div className="form-row">
          <label>
            Rubrik Categories{" "}
            <span className="hint">
              Merge Tokens: first, last, subj_pn, proj_pn, poss_pn
            </span>
            <span className="example">
              e.g. During the term, &#123;&#123;first&#125;&#125; was really
              bad. &#123;&#123;subj_pn&#125;&#125; can do better.
            </span>
          </label>
          {categories?.map((section, index) => (
            <Category
              key={`section${index}`}
              index={index}
              category={section}
              canMoveUp={index > 0}
              canMoveDown={index < categories.length - 1}
              onCategoryChanged={onCategoryChanged}
              onCategoryDeleted={onCategoryDeleted}
              onCategoryMoved={onCategoryMoved}
            />
          ))}
          <div className="add-section-form">
            <input
              placeholder="Category"
              onChange={(e) => setSectionName(e.target.value)}
              value={sectionName}
            ></input>
            <button className="primary" onClick={addCategory}>
              Add
            </button>
          </div>
        </div>
      </div>
      <button
        className="primary"
        disabled={!canSave}
        onClick={saveButtonClicked}
      >
        Save
      </button>
    </div>
  );
};
export default UpsertSubjects;
