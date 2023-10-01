import { useReducer, MouseEvent } from "react";
import styles from "./Subtask.module.scss";
import { useAppDispatch } from "hooks/reduxHooks";
import { addSubtask } from "store/tasks/tasksActions";
import { Button, Input } from "components";

interface IAddSubtaskProps {
  taskId: string;
}

interface State {
  isCreateSubtaskFormOpen: boolean;
  title: string;
}

type Action =
  | { type: "OPEN_FORM" }
  | { type: "CLOSE_FORM" }
  | { type: "SET_TITLE"; title: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_FORM":
      return { ...state, isCreateSubtaskFormOpen: true };
    case "CLOSE_FORM":
      return { ...state, isCreateSubtaskFormOpen: false, title: "" };
    case "SET_TITLE":
      return { ...state, title: action.title };
    default:
      return state;
  }
}

export const AddSubtask: React.FC<IAddSubtaskProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const [state, dispatchState] = useReducer(reducer, {
    isCreateSubtaskFormOpen: false,
    title: "",
  });

  const handleForm = (e: MouseEvent, isSubmit: boolean) => {
    e.preventDefault();
    if (isSubmit) {
      dispatch(addSubtask({ taskId, title: state.title }));
    }
    dispatchState({ type: "CLOSE_FORM" });
  };

  return (
    <>
      {state.isCreateSubtaskFormOpen ? (
        <form className={styles.addTaskForm}>
          <Input
            placeholder="Subtask title"
            size="small"
            value={state.title}
            onChange={(e) => {
              dispatchState({ type: "SET_TITLE", title: e.target.value });
            }}
          />
          <div className={styles.formButtons}>
            <Button
              size="small"
              type="primary"
              title="Add"
              onClick={(e) => handleForm(e, true)}
              disabled={!state.title}
            />
            <Button
              size="small"
              type="delete"
              title="Cancel"
              onClick={(e) => handleForm(e, false)}
            />
          </div>
        </form>
      ) : (
        <Button
          size="small"
          title="New subtask"
          onClick={() => dispatchState({ type: "OPEN_FORM" })}
        />
      )}
    </>
  );
};
