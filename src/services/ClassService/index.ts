import { BaseDataService } from "../BaseDataService";
import { IClass } from "./interfaces";

const defaultState = { nextId: 0, data: {} };

class ClassService extends BaseDataService<IClass> {
  constructor() {
    super("classes", defaultState);
  }
}

const classService = new ClassService();

export default classService;
