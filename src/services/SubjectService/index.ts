import { BaseService } from "../BaseService";
import { IComments } from "./interfaces";

const defaultState = { nextId: 0, data: {} };

class SubjectService extends BaseService<IComments> {
  constructor() {
    super("subjects", defaultState);
  }
}

const subjectService = new SubjectService();
export default subjectService;
