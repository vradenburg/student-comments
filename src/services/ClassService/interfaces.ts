export interface IClass {
  description: string;
  students: string;
}

export interface IStudent {
  first: string;
  last: string;
  subj_pn: string;
  proj_pn: string;
  poss_pn: string;
  levels: Record<number, Record<string, number>>;
}
