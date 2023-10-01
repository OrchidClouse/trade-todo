import styles from "./index.module.scss";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Column, TaskItem, HidingFilter } from "components";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { selectProjectTasks, selectTaskById } from "store/tasks/tasksSelectors";
import { selectProjectById } from "store/projects/projectsSelectors";
import { useDndLogic } from "../../hooks/useDndLogic";
import { updateProject } from "store/projects/projectsActions";

export const ProjectPage = () => {
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isRedactVisible, setIsRedactVisible] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentProject = useAppSelector((state) =>
    selectProjectById(state, projectId ? projectId : ""),
  );

  const projectTasks = useAppSelector((state) =>
    selectProjectTasks(state, projectId ? projectId : ""),
  );

  const filteredProjectTasks = projectTasks.filter(
    (task) =>
      task.id.toLowerCase().includes(filterValue.toLowerCase()) ||
      task.title.toLowerCase().includes(filterValue.toLowerCase()),
  );

  const task = useAppSelector((state) =>
    activeTaskId ? selectTaskById(state, activeTaskId) : null,
  );

  const {
    closestCorners,
    DndContext,
    DragOverlay,
    sensors,
    handleDragStart,
    handleDragEnd,
    dropAnimation,
  } = useDndLogic(projectTasks, task, setActiveTaskId);

  return (
    <>
      <Helmet>
        <title>{currentProject?.name}</title>
      </Helmet>
      <div className={`${styles.container}`}>
        <header className={`${styles.header}`}>
          <Button title="Back" onClick={() => navigate("/")} />
          <h2>{currentProject?.name}</h2>
          <div>
            {isRedactVisible ? (
              <>
                <h3>Redact (Press enter to save)</h3>
                <Input
                  value={newProjectTitle}
                  placeholder="Redact project name"
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  onBlur={() => setIsRedactVisible(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (newProjectTitle && projectId) {
                        dispatch(updateProject(projectId, newProjectTitle));
                        setNewProjectTitle("");
                      }
                      setIsRedactVisible(false);
                      setNewProjectTitle("");
                    }
                  }}
                />
              </>
            ) : (
              <button
                className={`${styles.redactButton}`}
                onClick={() => setIsRedactVisible(true)}
              ></button>
            )}
          </div>
          <div>
            <HidingFilter
              title="Enter a task name"
              placeholder="Enter task name"
              isSearchVisible={isSearchVisible}
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              setIsSearchVisible={setIsSearchVisible}
            />
          </div>
        </header>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className={`${styles.columns}`}>
            <Column
              id={"queue"}
              title={"queue"}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === "queue",
              )}
              projectId={projectId ? projectId : ""}
            />
            <Column
              id={"development"}
              title={"development"}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === "development",
              )}
              projectId={projectId ? projectId : ""}
            />
            <Column
              id={"done"}
              title={"done"}
              tasks={filteredProjectTasks.filter(
                (task) => task.status === "done",
              )}
              projectId={projectId ? projectId : ""}
            />
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
