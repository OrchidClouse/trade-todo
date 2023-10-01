import { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./index.module.scss";
import { Input, Button, ProjectCard, HidingFilter } from "components";
import { useAppSelector, useAppDispatch } from "hooks/reduxHooks";
import { addProject } from "store/projects/projectsActions";

export const SelectProjectPage = () => {
  const [newProjectName, setNewProjectName] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const projects = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  const filteredProjects = projects.filter((project) =>
    project.name.includes(filterValue),
  );

  return (
    <>
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <div className={`${styles.container}`}>
        <header className={`${styles.header}`}>
          <div className={`${styles.createProjectInputContainer}`}>
            <h3>Create new project</h3>
            <Input
              value={newProjectName}
              placeholder="Enter new project name"
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (newProjectName && e.key === "Enter") {
                  dispatch(addProject(newProjectName));
                  setNewProjectName("");
                }
              }}
            />
            <Button
              title="Add new project"
              onClick={() => {
                if (newProjectName) {
                  dispatch(addProject(newProjectName));
                  setNewProjectName("");
                }
              }}
            />
          </div>
          <div className={`${styles.searchProjectInputContainer}`}>
            <HidingFilter
              title="Enter a project name"
              placeholder="Enter project name"
              isSearchVisible={isSearchVisible}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              setIsSearchVisible={setIsSearchVisible}
            />
          </div>
        </header>
        <div className={`${styles.projectList}`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              project={project}
            />
          ))}
        </div>
      </div>
    </>
  );
};
