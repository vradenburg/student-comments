import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import subjectService from "../../../services/SubjectService";

const SubjectsList = () => {
  const [classes, setClasses] = useState<{ id: number; description: string }[]>(
    []
  );

  useEffect(() => {
    const list = subjectService.getList();
    setClasses(list);
  }, [setClasses]);

  function deleteClassById(id: number) {
    subjectService.deleteById(id);
    setClasses(subjectService.getList());
  }

  let idx = 0;

  return (
    <div>
      <h2>Subjects</h2>
      <div className="list">
        {classes.map((cls) => (
          <div key={idx++} className="item">
            <a href={`#/subject/${cls.id}/edit`}>{cls.description}</a>
            <button className="delete" onClick={() => deleteClassById(cls.id)}>
              <MdDeleteForever />
            </button>
          </div>
        ))}
      </div>
      <button
        className="primary"
        onClick={() => {
          window.location.href = `#/subject/add`;
        }}
      >
        Add
      </button>
    </div>
  );
};

export default SubjectsList;
