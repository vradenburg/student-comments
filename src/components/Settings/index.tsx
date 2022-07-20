import classService from "../../services/ClassService";
import commentService from "../../services/CommentService";
import DownloadButton from "./DownloadButton";
import { UploadFile } from "./UploadFile";

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      <div>
        <DownloadButton
          text="Download My Classes"
          data={classService.getState()}
          fileName="classes.json"
          fileType="text/json"
        ></DownloadButton>
      </div>
      <div>
        <DownloadButton
          text="Download My Comments"
          data={commentService.getState()}
          fileName="comments.json"
          fileType="text/json"
        ></DownloadButton>
      </div>
      <div>
        <UploadFile
          title="Upload My Classes"
          service={classService}
        ></UploadFile>
      </div>
      <div>
        <UploadFile
          title="Upload My Comments"
          service={commentService}
        ></UploadFile>
      </div>
    </div>
  );
};
export default Settings;
