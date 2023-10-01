import { useDispatch } from "react-redux";
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerActivationConstraint,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { changeTaskStatus } from "store/tasks/tasksActions";
import { Status } from "types/Task";

export const useDndLogic = (
  projectTasks: any,
  task: any,
  setActiveTaskId: (id: string | null) => void,
) => {
  const dispatch = useDispatch();

  const activationConstraint: PointerActivationConstraint = {
    distance: 15,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = task ? projectTasks.indexOf(task) : 0;
      const overIndex = task ? projectTasks.indexOf(task) : 0;

      dispatch(changeTaskStatus(active.id as string, over?.id as Status));
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    dropAnimation,
    closestCorners,
    DragOverlay,
    DndContext,
  };
};
