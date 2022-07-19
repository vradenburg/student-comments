import { BaseService } from "../BaseService";
import { IComments } from "./interfaces";

const defaultState = { nextId: 0, data: {} };

class CommentService extends BaseService<IComments> {
  constructor() {
    super("comments", defaultState);
  }
}

const commentService = new CommentService();
export default commentService;
