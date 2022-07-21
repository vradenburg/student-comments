import "./index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentService from "../../../services/CommentService";
import { ISection } from "../../../services/CommentService/interfaces";
import Section from "./Section";
import { MdOutlineAdd } from "react-icons/md";

const UpsertComments = () => {
  const { id: idString } = useParams();
  const isCreateMode = !idString;

  const id: number | undefined = isCreateMode ? undefined : parseInt(idString);

  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<ISection[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (!isCreateMode && !isInitialized) {
      console.log("Initialize");
      setIsInitialized(true);
      const result = commentService.getById(id);
      if (result) {
        setDescription(result.description);
        setSections(result.sections);
        setCanSave(false);
      }
    }
  }, [id, isCreateMode, isInitialized]);

  const onDescriptionChanged = (description: string) => {
    setDescription(description);
    setCanSave(true);
  };

  const onSectionChanged = (index: number, section: ISection) => {
    const updatedSections = Array.from(sections);
    updatedSections[index] = section;
    setSections(updatedSections);
    setCanSave(true);
  };
  const onSectionDeleted = (index: number) => {
    const updatedSections = Array.from(sections);
    updatedSections.splice(index, 1);
    setSections(updatedSections);
    setCanSave(true);
  };

  const onSectionMoved = (index: number, isDown: boolean) => {
    let newIndex = isDown ? index + 1 : index - 1;
    if (newIndex < 0) newIndex = 0;
    const updatedSections = Array.from(sections);
    if (newIndex > updatedSections.length) newIndex = updatedSections.length;
    const [item] = updatedSections.splice(index, 1);
    updatedSections.splice(newIndex, 0, item);
    setSections(updatedSections);
    setCanSave(true);
  };

  const addSection = () => {
    const updatedSections = Array.from(sections);
    updatedSections.push({
      name: sectionName,
      comments: { level1: "", level2: "", level3: "", level4: "" },
    });
    setSections(updatedSections);
    setCanSave(true);
    setSectionName("");
  };

  const saveButtonClicked = () => {
    const itemId = commentService.save(id, { description, sections });
    if (isCreateMode) {
      window.location.href = `#/comments/${itemId}/edit`;
    } else {
      setCanSave(false);
    }
  };

  return (
    <div>
      <h2>
        <a href="#/comments">Comments</a> \{" "}
        {isCreateMode ? "Add New" : "Update"} Comments
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
            Sections{" "}
            <span className="hint">
              Merge Tokens: first, last, subj_pn, proj_pn, poss_pn
            </span>
            <span className="example">
              e.g. During the term, &#123;&#123;first&#125;&#125; was really
              bad. &#123;&#123;subj_pn&#125;&#125; can do better.
            </span>
          </label>
          {sections.map((section, index) => (
            <Section
              key={`section${index}`}
              index={index}
              section={section}
              canMoveUp={index > 0}
              canMoveDown={index < sections.length - 1}
              onSectionChanged={onSectionChanged}
              onSectionDeleted={onSectionDeleted}
              onSectionMoved={onSectionMoved}
            />
          ))}
          <div className="add-section-form">
            <input
              placeholder="New Section Name"
              onChange={(e) => setSectionName(e.target.value)}
              value={sectionName}
            ></input>
            <button onClick={addSection}>
              <MdOutlineAdd />
            </button>
          </div>
        </div>
      </div>
      <button disabled={!canSave} onClick={saveButtonClicked}>
        Save
      </button>
    </div>
  );
};
export default UpsertComments;