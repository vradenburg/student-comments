import "./Main.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";
import UpsertClass from "./components/Classes/UpsertClass";
import UpsertSubjects from "./components/Subjects/UpsertSubjects";
import ClassesList from "./components/Classes/ClassesList";
import SubjectsList from "./components/Subjects/SubjectsList";
const Main = () => {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<ClassesList />} />
        <Route path="/class/add" element={<UpsertClass />} />
        <Route path="/class/:id/edit" element={<UpsertClass />} />
        <Route path="/subjects" element={<SubjectsList />} />
        <Route path="/subject/add" element={<UpsertSubjects />} />
        <Route path="/subject/:id/edit" element={<UpsertSubjects />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Main;
