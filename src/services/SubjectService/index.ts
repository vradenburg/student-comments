import { BaseDataService } from "../BaseDataService";
import { IComments } from "./interfaces";

const defaultState = { nextId: 0, data: {} };

class SubjectService extends BaseDataService<IComments> {
  constructor() {
    super("subjects", defaultState);
  }
}

const subjectService = new SubjectService();
export default subjectService;
