import {MainPage, TodoPage} from "./view";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  </Router>
)
