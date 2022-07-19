import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classService from "../../../services/ClassService";

const UpsertClass = () => {
  const { id: idString } = useParams();
  const isCreateMode = !idString;
  const id = isCreateMode ? undefined : parseInt(idString);

  const [description, setDescription] = useState("");
  const [students, setStudents] = useState("");

  useEffect(() => {
    if (!isCreateMode) {
      const result = classService.getById(id);
      if (result) {
        setDescription(result.description);
        setStudents(result.students);
      }
    }
  }, [id, isCreateMode, setDescription, setStudents]);

  function saveButtonClicked() {
    const classId = classService.save(id, { description, students });
    if (isCreateMode) {
      window.location.href = `#/class/${classId}/edit`;
    }
  }

  return (
    <div>
      <h2>
        <a href="#/classes">Classes</a> \ {isCreateMode ? "Add New" : "Update"}{" "}
        Class
      </h2>

      <div className="form">
        <div className="form-row">
          <label>Class Name</label>
          <input
            name="className"
            placeholder="ex: Grade 7 - 22/23"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></input>
        </div>

        <div className="form-row">
          <label>
            Students{" "}
            <span className="hint">
              One row per student. (First, Last, Subject Pronoun, Object
              Pronoun, Possessive Pronoun, Level)
            </span>
          </label>
          <textarea
            name="students"
            rows={15}
            placeholder="ex: Jane, Smith, She, Her, Hers, 3"
            onChange={(e) => setStudents(e.target.value)}
            value={students}
          ></textarea>
        </div>
      </div>
      <button onClick={saveButtonClicked}>Save</button>
    </div>
  );
};
export default UpsertClass;
