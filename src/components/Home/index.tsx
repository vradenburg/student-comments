import "./index.css";
import { useEffect, useState } from "react";
import classService from "../../services/ClassService";
import subjectService from "../../services/SubjectService";
import { CSVLink } from "react-csv";
import { IStudent } from "../../services/ClassService/interfaces";
import { IComments } from "../../services/SubjectService/interfaces";
import ClassSelect from "../Classes/ClassSelect";
import SubjectList from "./SubjectList";
import AddSubject from "./AddSubject";
import { mergeComment } from "./MergeComment";

const Home = () => {
  const [selectedClass, setSelectedClass] = useState<{
    classId: number;
    students: IStudent[];
  }>({ classId: -1, students: [] });
  const [subjects, setSubjects] = useState<
    {
      subjectId: number;
      sectionNames: string[];
      subject: IComments | undefined;
    }[]
  >([]);
  const [mergeData, setMergeData] = useState<Record<string, string>[]>([]);

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
          subject?.categories?.map((category) => {
            return mergeComment(item.subjectId, category, student);
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
          first: first?.trim(),
          last: last?.trim(),
          subj_pn: subj_pn?.trim(),
          proj_pn: proj_pn?.trim(),
          poss_pn: poss_pn?.trim(),
          levels: {},
        };
      }) || [];

    setSelectedClass({ classId, students });
  };

  const onAddSubject = (subjectId: number) => {
    const updatedSubjects = Array.from(subjects);
    const subject = subjectService.getById(subjectId);
    if (subject) {
      updatedSubjects.push({
        subjectId: subjectId,
        sectionNames: subject?.categories?.map((s) => s.name) || [],
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
    category: string,
    level: number
  ) => {
    console.log("SELECTED_CLASS", selectedClass);
    const updatedClass = Object.assign({}, selectedClass);
    const { levels } = updatedClass.students[studentIndex];
    const subjectCategory = levels[subjectId] || {};
    subjectCategory[category] = level;
    updatedClass.students[studentIndex].levels[subjectId] = subjectCategory;
    setSelectedClass(updatedClass);
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="form">
        <h3>Generate Class Comments</h3>
        <ClassSelect
          selectedClass={selectedClass}
          onClassSelected={onClassSelected}
        />
        <SubjectList
          subjects={subjects}
          students={selectedClass.students}
          onDeleteSubjectClicked={onDeleteSubjectClicked}
          onLevelChanged={onLevelChanged}
        />
        <AddSubject
          subjectIds={subjects?.map((s) => s.subjectId)}
          onAddSubject={onAddSubject}
        />
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
