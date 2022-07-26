import classService from "../../../services/ClassService";

interface IProps {
  selectedClass: { classId: number };
  onClassSelected: (classId: number) => void;
}

const ClassSelect = ({ selectedClass, onClassSelected }: IProps) => {
  return (
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
  );
};
export default ClassSelect;
