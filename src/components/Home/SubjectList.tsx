import { MdDeleteForever } from "react-icons/md";
import { IStudent } from "../../services/ClassService/interfaces";
import { IComments } from "../../services/SubjectService/interfaces";
import StudentsList from "./StudentsList";

interface IProps {
  subjects: {
    subjectId: number;
    sectionNames: string[];
    subject: IComments | undefined;
  }[];
  students: IStudent[];
  onDeleteSubjectClicked: (subjectId: number) => void;
  onLevelChanged: (
    subjectId: number,
    studentIndex: number,
    section: string,
    level: number
  ) => void;
}

const SubjectList = ({
  subjects,
  students,
  onDeleteSubjectClicked,
  onLevelChanged,
}: IProps) => {
  return (
    <div>
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
            students={students}
            onLevelChanged={onLevelChanged}
          />
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
