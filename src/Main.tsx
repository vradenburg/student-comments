import "./Main.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Settings from "./components/Settings";
import UpsertClass from "./components/Classes/UpsertClass";
import UpsertComments from "./components/Comments/UpsertComments";
import ClassesList from "./components/Classes/ClassesList";
import CommentsList from "./components/Comments/CommentsList";
const Main = () => {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<ClassesList />} />
        <Route path="/class/add" element={<UpsertClass />} />
        <Route path="/class/:id/edit" element={<UpsertClass />} />
        <Route path="/comments" element={<CommentsList />} />
        <Route path="/comment/add" element={<UpsertComments />} />
        <Route path="/comment/:id/edit" element={<UpsertComments />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Main;
