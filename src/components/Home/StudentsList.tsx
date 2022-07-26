import "./StudentList.css";
import { IStudent } from "../../services/ClassService/interfaces";
import settingsService from "../../services/SettingsService";

interface IProps {
  subjectId: number;
  sectionNames: string[];
  students: IStudent[];
  onLevelChanged: (
    subjectId: number,
    studentIndex: number,
    section: string,
    level: number
  ) => void;
}

const StudentsList = ({
  subjectId,
  sectionNames,
  students,
  onLevelChanged,
}: IProps) => {
  const levels = settingsService.getLevels();

  return students.length > 0 ? (
    <div className="students">
      <div className="header">
        <div className="student-title">Student</div>
        <div className="level-title">Levels (1-{levels})</div>
      </div>
      {students.map((student, index) => (
        <Student
          key={`student${index}`}
          subjectId={subjectId}
          studentIndex={index}
          sectionNames={sectionNames}
          student={student}
          onLevelChanged={onLevelChanged}
        />
      ))}
    </div>
  ) : (
    <div />
  );
};

interface IStudentProps {
  subjectId: number;
  studentIndex: number;
  sectionNames: string[];
  student: IStudent;
  onLevelChanged: (
    subjectId: number,
    studentIndex: number,
    section: string,
    level: number
  ) => void;
}
const Student = ({
  subjectId,
  studentIndex,
  sectionNames,
  student,
  onLevelChanged,
}: IStudentProps) => {
  return (
    <div className="student">
      <div className="student-info">
        {student.first} {student.last}{" "}
        <span className="pronouns">
          {student.subj_pn} | {student.proj_pn} | {student.poss_pn}
        </span>
      </div>
      {sectionNames.map((sectionName, index) => (
        <input
          key={`level-${subjectId}-${studentIndex}-${sectionName}`}
          placeholder={sectionName}
          onChange={(e) =>
            onLevelChanged(
              subjectId,
              studentIndex,
              sectionName,
              parseInt(e.target.value)
            )
          }
          value={student.levels[subjectId]?.[sectionName] || ""}
        ></input>
      ))}
    </div>
  );
};

export default StudentsList;
