import { IStudent } from "../../services/ClassService/interfaces";
import { ICategory } from "../../services/SubjectService/interfaces";

const titleize = (str: string) => {
  let upper = true;
  let newStr = "";
  for (let i = 0, l = str.length; i < l; i++) {
    // Note that you can also check for all kinds of spaces  with
    // str[i].match(/\s/)
    if (str[i] === " ") {
      upper = true;
      newStr += str[i];
      continue;
    }
    newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
    upper = false;
  }
  return newStr;
};

export const mergeComment = (
  subjectId: number,
  category: ICategory,
  student: IStudent
) => {
  const level = student.levels[subjectId]?.[category.name] - 1;
  let comment = category.comments[level] || "";

  for (const key of Object.keys(student)) {
    const pattern = `{{${key}}}`;
    const re = RegExp(pattern, "gi");
    for (const match of comment.match(re)?.slice().reverse() || []) {
      const token = match.replace("{{", "").replace("}}", "");
      const shouldCapitalize =
        ["first", "last"].includes(token.toLocaleLowerCase()) ||
        token.charAt(0) === token.charAt(0).toUpperCase();
      const value = (student as any)[key];

      const replaceWith = shouldCapitalize
        ? titleize(value)
        : value.toLocaleLowerCase();

      comment = comment.replace(match, replaceWith);
    }
  }

  return comment;
};
