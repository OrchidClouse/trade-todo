import { SelectProjectPage, ProjectPage } from "./view";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SelectProjectPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  </Router>
);
