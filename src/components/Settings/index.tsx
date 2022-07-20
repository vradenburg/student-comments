import "./index.css";
import classService from "../../services/ClassService";
import commentService from "../../services/CommentService";
import DownloadButton from "./DownloadButton";
import { UploadFile } from "./UploadFile";

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      <div className="export-data">
        <h3>Export</h3>
        <p>
          Use the following buttons to download "My Classes" and "My Comments"
          data. These buttons will download the data in a JSON format.
        </p>
        <div>
          <DownloadButton
            text="Download My Classes"
            data={classService.getState()}
            fileName="classes.json"
            fileType="text/json"
          ></DownloadButton>
          <DownloadButton
            text="Download My Comments"
            data={commentService.getState()}
            fileName="comments.json"
            fileType="text/json"
          ></DownloadButton>
        </div>
      </div>

      <div className="import-data">
        <h3>Import</h3>
        <p>
          Use the following controls to upload "My Classes" and "My Comments"
          data. This will overwrite the existing data.
        </p>
        <h4>My Classes</h4>
        <UploadFile text="Upload" service={classService}></UploadFile>
        <h4>My Comments</h4>
        <UploadFile text="Upload" service={commentService}></UploadFile>
      </div>
    </div>
  );
};
export default Settings;
