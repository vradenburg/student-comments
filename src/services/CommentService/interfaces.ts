export interface IComment {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}

export interface ISection {
  name: string;
  comments: IComment;
}

export interface IComments {
  description: string;
  sections: ISection[];
}
