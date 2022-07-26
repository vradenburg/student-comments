import "./index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import subjectService from "../../../services/SubjectService";
import { ISection } from "../../../services/SubjectService/interfaces";
import Section from "./Section";
import { MdOutlineAdd } from "react-icons/md";

const UpsertSubjects = () => {
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
      const result = subjectService.getById(id);
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
      comments: [],
    });
    setSections(updatedSections);
    setCanSave(true);
    setSectionName("");
  };

  const saveButtonClicked = () => {
    const itemId = subjectService.save(id, { description, sections });
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
              placeholder="Section"
              onChange={(e) => setSectionName(e.target.value)}
              value={sectionName}
            ></input>
            <button className="primary" onClick={addSection}>
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
