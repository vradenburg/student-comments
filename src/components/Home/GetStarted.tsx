import "./GetStarted.css";

const GetStarted = () => {
  return (
    <div className="get-started">
      <h3>Getting Started</h3>
      To get started, create a <a href="#/class/add">Class</a> and{" "}
      <a href="#/subject/add">Subject</a>!
      <p>
        After creating your classes and subjects, use the form below to generate
        comments. The comments will be downloaded in CSV format to make it easy
        to copy and paste!
      </p>
    </div>
  );
};
export default GetStarted;
