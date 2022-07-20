import "./UploadFile.css";
import React, { useState } from "react";
import { BaseService, IDescription, IState } from "../../services/BaseService";
import { v4 } from "uuid";

interface IProps<TData extends IDescription> {
  text: string;
  service: BaseService<TData>;
}

export function UploadFile<TData extends IDescription>({
  text,
  service,
}: IProps<TData>) {
  const [state, setState] = useState<IState<TData>>();
  const [fileInputKey, setFileInputKey] = useState(v4());

  const onFileUploadChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (!e.target?.result) return;
      const state = JSON.parse(e.target.result.toString());
      if (
        Object.keys(state).includes("nextId") &&
        Object.keys(state).includes("data")
      ) {
        console.log("SET_STATE", state);
        setState(state);
      }
    };
  };

  const onSaveButtonClicked = () => {
    if (!state) return;
    service.setState(state);
    setFileInputKey(v4());
    setState(undefined);
  };

  return (
    <div className="upload-file">
      <input
        type="file"
        key={fileInputKey}
        onChange={(e) => onFileUploadChanged(e)}
        id="file"
        name="file"
      />
      <button type="button" disabled={!state} onClick={onSaveButtonClicked}>
        {text}
      </button>
    </div>
  );
}
