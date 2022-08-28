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
              name: "Subjective (He|She|They)",
              char: "{{Subj_pn}}",
            },
            {
              name: "Subjective (he|she|they)",
              char: "{{subj_pn}}",
            },
            {
              name: "Projective (Him|Her|Them)",
              char: "{{Proj_pn}}",
            },
            {
              name: "Projective (him|her|them)",
              char: "{{proj_pn}}",
            },
            {
              name: "Posessive (His|Hers|Their)",
              char: "{{Poss_pn}}",
            },
            {
              name: "Posessive (his|hers|Their)",
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
