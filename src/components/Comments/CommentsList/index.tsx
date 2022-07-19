import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import commentService from "../../../services/CommentService";

const CommentsList = () => {
  const [classes, setClasses] = useState<{ id: number; description: string }[]>(
    []
  );

  useEffect(() => {
    const list = commentService.getList();
    setClasses(list);
  }, [setClasses]);

  function deleteClassById(id: number) {
    commentService.deleteById(id);
    setClasses(commentService.getList());
  }

  let idx = 0;

  return (
    <div>
      <h2>Comments</h2>
      <div className="list">
        {classes.map((cls) => (
          <div key={idx++} className="item">
            <a href={`#/comment/${cls.id}/edit`}>{cls.description}</a>
            <button onClick={() => deleteClassById(cls.id)}>
              <MdDeleteForever />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          window.location.href = `#/comment/add`;
        }}
      >
        Add Comments
      </button>
    </div>
  );
};

export default CommentsList;
