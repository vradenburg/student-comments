import { BaseService } from "../BaseService";
import { IClass } from "./interfaces";

const defaultState = { nextId: 0, data: {} };

class ClassService extends BaseService<IClass> {
  constructor() {
    super("classes", defaultState);
  }
}

const classService = new ClassService();

export default classService;
