import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import classService from "../../../services/ClassService";

const ClassesList = () => {
  const [classes, setClasses] = useState<{ id: number; description: string }[]>(
    []
  );

  useEffect(() => {
    const list = classService.getList();
    setClasses(list);
  }, [setClasses]);

  function deleteClassById(id: number) {
    classService.deleteById(id);
    setClasses(classService.getList());
  }

  let idx = 0;

  return (
    <div>
      <h2>Classes</h2>
      <div className="list">
        {classes.map((cls) => (
          <div key={idx++} className="item">
            <a href={`#/class/${cls.id}/edit`}>{cls.description}</a>
            <button onClick={() => deleteClassById(cls.id)}>
              <MdDeleteForever />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesList;
