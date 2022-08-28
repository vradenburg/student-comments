import "@webscopeio/react-textarea-autocomplete/style.css";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import { ICategory } from "../../../services/SubjectService/interfaces";

interface IProps {
  category: ICategory;
  comment: string;
  level: number;
  onChange: (partial: any) => void;
}

// type ItemProps = {
//   entity: {
//     name: string;
//     char: string;
//   };
// };

const Item = ({ entity: { name, char } }: any) => (
  <div>{`${name}: ${char}`}</div>
);

// type LoadingProps = {
//   data: Array<{ name: string; char: string }>;
// };

const Loading = ({ data }: any) => <div>Loading</div>;

const AutoCompleteTextArea = ({
  category,
  comment,
  level,
  onChange,
}: IProps) => {
  return (
    <ReactTextareaAutocomplete
      className="my-textarea"
      key={`level${level}`}
      rows={5}
      value={comment}
      placeholder={`Level ${level + 1}`}
      loadingComponent={Loading}
      onChange={(e: any) => {
        category.comments[level] = e.target.value;
        onChange({
          comments: category.comments,
        });
      }}
      minChar={0}
      trigger={{
        "{{": {
          dataProvider: (token: string) => [
            { name: "First", char: "{{First}}" },
            { name: "Last", char: "{{Last}}" },
            {
              name: "Subjective Pronoun - Uppercase",
              char: "{{Subj_pn}}",
            },
            {
              name: "Subjective Pronoun - Lowercase",
              char: "{{subj_pn}}",
            },
            {
              name: "Projective Pronoun - Uppercase",
              char: "{{Proj_pn}}",
            },
            {
              name: "Projective Pronoun - Lowercase",
              char: "{{proj_pn}}",
            },
            {
              name: "Posessive Pronoun - Uppercase",
              char: "{{Poss_pn}}",
            },
            {
              name: "Posessive Pronoun - Lowercase",
              char: "{{poss_pn}}",
            },
          ],
          component: Item,
          output: (item: any, trigger: any) => item.char,
        },
      }}
    />
  );
};

export default AutoCompleteTextArea;
