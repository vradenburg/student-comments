import "./index.css";
import classService from "../../services/ClassService";
import subjectService from "../../services/SubjectService";
import DownloadButton from "./DownloadButton";
import { UploadFile } from "./UploadFile";
import settingsService from "../../services/SettingsService";
import { useState } from "react";

const Settings = () => {
  const [levels, setLevels] = useState(settingsService.getLevels());

  const onLevelsChanged = (levels: number) => {
    settingsService.setLevels(levels);
    setLevels(levels);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className="default-settings">
        <h3>Default Settings</h3>
        <div>
          <input
            value={levels}
            onChange={(e) => onLevelsChanged(parseInt(e.target.value))}
          ></input>
          Number of comment levels.
        </div>
      </div>

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
            data={subjectService.getState()}
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
        <UploadFile text="Upload" service={subjectService}></UploadFile>
      </div>
    </div>
  );
};
export default Settings;
