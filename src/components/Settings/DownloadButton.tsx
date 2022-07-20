import React from "react";

interface IProps {
  text: string | undefined;
  data: any;
  fileName?: string;
  fileType?: string;
}

function DownloadButton({ text, data, fileName, fileType }: IProps) {
  const downloadFile = (data: string, fileName: string, fileType: string) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: any,
    fileName: string = "file.json",
    fileType: string = "text/json"
  ) => {
    e.preventDefault();
    downloadFile(JSON.stringify(data), fileName, fileType);
  };

  return (
    <button
      type="button"
      onClick={(e) => exportToJson(e, data, fileName, fileType)}
    >
      {text || "Download"}
    </button>
  );
}

export default DownloadButton;
