import "./StudentList.css";
import { IStudent } from "../../services/ClassService/interfaces";

interface IProps {
  students: IStudent[];
  onLevelChanged: (index: number, level: number) => void;
}

const StudentsList = ({ students, onLevelChanged }: IProps) => {
  return students.length > 0 ? (
    <div className="students">
      <div className="header">
        <div className="student-title">Student</div>
        <div className="level-title">Level</div>
      </div>
      {students.map((student, index) => (
        <Student
          key={`student${index}`}
          index={index}
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
  index: number;
  student: IStudent;
  onLevelChanged: (index: number, level: number) => void;
}
const Student = ({ index, student, onLevelChanged }: IStudentProps) => {
  return (
    <div className="student">
      <div className="student-info">
        {student.first} {student.last}{" "}
        <span className="pronouns">
          {student.subj_pn} | {student.proj_pn} | {student.poss_pn}
        </span>
      </div>
      <input
        onChange={(e) => onLevelChanged(index, parseInt(e.target.value))}
        value={student.level}
      ></input>
    </div>
  );
};

export default StudentsList;
