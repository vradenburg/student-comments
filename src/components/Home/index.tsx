import "./index.css";
import { useEffect, useState } from "react";
import classService from "../../services/ClassService";
import subjectService from "../../services/SubjectService";
import { CSVLink } from "react-csv";
import { IStudent } from "../../services/ClassService/interfaces";
import StudentsList from "./StudentsList";
import { MdDeleteForever, MdDownload } from "react-icons/md";
import { IComments, ISection } from "../../services/SubjectService/interfaces";

const Home = () => {
  const [selectedClass, setSelectedClass] = useState<{
    classId: number;
    students: IStudent[];
  }>({ classId: -1, students: [] });
  const [selectedSubjectId, setSelectedSubjectId] = useState(-1);
  const [subjects, setSubjects] = useState<
    {
      subjectId: number;
      sectionNames: string[];
      subject: IComments | undefined;
    }[]
  >([]);
  // const [selectedCommentId, setSelectedCommentId] = useState(-1);
  const [mergeData, setMergeData] = useState<Record<string, string>[]>([]);

  const mergeComment = (
    subjectId: number,
    section: ISection,
    comments: string[],
    student: IStudent
  ) => {
    const level = student.levels[subjectId]?.[section.name];
    let comment = comments[level] || "";
    for (const key of Object.keys(student)) {
      comment = comment.replace(
        new RegExp(`{{${key}}}`, "gi"),
        (student as any)[key]
      );
    }

    return comment;
  };

  useEffect(() => {
    if (
      selectedClass.classId === -1 ||
      subjects.filter((s) => s.subjectId !== -1).length === 0
    ) {
      setMergeData([]);
      return;
    }

    const data = selectedClass.students.map((student) => {
      const result: Record<string, string> = {
        name: `${student.first} ${student.last}`,
      };

      for (const item of subjects) {
        const subject = subjectService.getById(item.subjectId);
        const mergedComments =
          subject?.sections.map((section) => {
            const comments = [
              "", // level0 Ignored
              section.comments.level1,
              section.comments.level2,
              section.comments.level3,
              section.comments.level4,
            ];
            return mergeComment(item.subjectId, section, comments, student);
          }) || [];

        result[`${subject?.description || "undefined"} Comments`] =
          mergedComments.filter((f) => f).join("\n\n");
      }

      return result;
    });

    setMergeData(data);
    console.log({ mergeData: data });
  }, [selectedClass, subjects]);

  const onClassSelected = (classId: number) => {
    // if (classId === -1) return;
    const cls = classService.getById(classId);
    const students =
      cls?.students.split("\n").map((item) => {
        const [first, last, subj_pn, proj_pn, poss_pn] = item.split(",");
        return {
          first: first.trim(),
          last: last.trim(),
          subj_pn: subj_pn.trim(),
          proj_pn: proj_pn.trim(),
          poss_pn: poss_pn.trim(),
          levels: {},
        };
      }) || [];

    setSelectedClass({ classId, students });
  };

  const onAddSubject = () => {
    const updatedSubjects = Array.from(subjects);
    const subject = subjectService.getById(selectedSubjectId);
    if (subject) {
      updatedSubjects.push({
        subjectId: selectedSubjectId,
        sectionNames: subject?.sections.map((s) => s.name) || [],
        subject,
      });
      setSubjects(updatedSubjects);
    }
  };

  const onDeleteSubjectClicked = (subjectId: number) => {
    const filteredSubjects = Array.from(subjects).filter(
      (s) => s.subjectId !== subjectId
    );
    setSubjects(filteredSubjects);
  };

  const onLevelChanged = (
    subjectId: number,
    studentIndex: number,
    section: string,
    level: number
  ) => {
    const updatedClass = Object.assign({}, selectedClass);
    updatedClass.students[studentIndex].levels[subjectId][section] = level;
    setSelectedClass(updatedClass);
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="form">
        <h3>Generate Class Comments</h3>
        <div>
          <select
            onChange={(e) => onClassSelected(parseInt(e.target.value))}
            value={selectedClass.classId}
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

        {subjects.map((subject, index) => (
          <div key={`subjects-${index}`} className="comment-selector">
            <h4 className="large">
              {subject.subject?.description}
              <button
                className="delete hover"
                onClick={() => onDeleteSubjectClicked(subject.subjectId)}
              >
                <MdDeleteForever />
              </button>
            </h4>

            <StudentsList
              subjectId={subject.subjectId}
              sectionNames={subject.sectionNames}
              students={selectedClass.students}
              onLevelChanged={onLevelChanged}
            />
          </div>
        ))}

        <div>
          <select
            onChange={(e) => setSelectedSubjectId(parseInt(e.target.value))}
            value={selectedSubjectId}
          >
            <option key={`class-1`} value={-1}>
              Choose Subject...
            </option>
            {subjectService
              .getList()
              .filter((o) => !subjects.map((s) => s.subjectId).includes(o.id))
              .map((item) => (
                <option key={`class${item.id}`} value={item.id}>
                  {item.description}
                </option>
              ))}
          </select>
          <button className="add-subject" onClick={onAddSubject}>
            Add
          </button>
        </div>
      </div>
      <div className="download">
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
