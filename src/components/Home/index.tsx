import "./index.css";
import { useEffect, useState } from "react";
import classService from "../../services/ClassService";
import commentService from "../../services/CommentService";
import { CSVLink } from "react-csv";
import { IStudent } from "../../services/ClassService/interfaces";
import StudentsList from "./StudentsList";

const Home = () => {
  const [selectedClassId, setSelectedClassId] = useState(-1);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState(-1);
  const [mergeData, setMergeData] = useState<
    { name: string; comments: string }[]
  >([]);

  const mergeComment = (comment: string, student: any) => {
    for (const key of Object.keys(student)) {
      comment = comment.replace(new RegExp(`{{${key}}}`, "gi"), student[key]);
    }

    return comment;
  };

  useEffect(() => {
    if (selectedClassId === -1) return;

    const cls = classService.getById(selectedClassId);

    setStudents(
      cls?.students.split("\n").map((item) => {
        const [first, last, subj_pn, proj_pn, poss_pn] = item.split(",");
        return {
          first: first.trim(),
          last: last.trim(),
          subj_pn: subj_pn.trim(),
          proj_pn: proj_pn.trim(),
          poss_pn: poss_pn.trim(),
          level: 1,
        };
      }) || []
    );
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedCommentId === -1) return;

    const comments = commentService.getById(selectedCommentId);

    const data = students.map((student) => {
      const mergedComments =
        comments?.sections.map((section) => {
          const comments = [
            "", // level0 Ignored
            section.comments.level1,
            section.comments.level2,
            section.comments.level3,
            section.comments.level4,
          ];
          return mergeComment(comments[student.level], student);
        }) || [];

      return {
        name: `${student.first} ${student.last}`,
        comments: mergedComments.join("\n\n"),
      };
    });

    setMergeData(data);
    console.log({ mergeData: data });
  }, [selectedCommentId, students]);

  const onLevelChanged = (index: number, level: number) => {
    const updatedStudents = Array.from(students);
    updatedStudents[index].level = level;
    setStudents(updatedStudents);
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="form">
        <h3>Generate Class Comments</h3>
        <div>
          <select
            onChange={(e) => setSelectedClassId(parseInt(e.target.value))}
            value={selectedClassId}
          >
            <option key={`class-1`} value={-1}>
              Choose Class...
            </option>
            {classService.getList().map((item) => (
              <option key={`class${item.id}`} value={item.id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <StudentsList students={students} onLevelChanged={onLevelChanged} />

        <div className="comment-selector">
          <select
            onChange={(e) => {
              setSelectedCommentId(parseInt(e.target.value));
            }}
            value={selectedCommentId}
          >
            <option key={`class-1`} value={-1}>
              Choose Comments...
            </option>
            {commentService.getList().map((item) => (
              <option key={`class${item.id}`} value={item.id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>
        <CSVLink
          className="download-link"
          hidden={mergeData.length === 0}
          data={mergeData}
          asyncOnClick={true}
          filename="results.csv"
          target="_blank"
        >
          Download Comments
        </CSVLink>
      </div>
    </div>
  );
};
export default Home;
