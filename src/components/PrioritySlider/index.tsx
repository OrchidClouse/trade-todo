import styles from './PrioritySlider.module.scss'
import { useAppDispatch } from 'hooks/reduxHooks';
import { changeTaskPriority } from 'store/tasks/tasksActions';

interface IPrioritySliderProps {
  priority: number;
  setPriority: (value: number) => void;
  taskId?: string
}

export const PrioritySlider: React.FC<IPrioritySliderProps> = ({ priority, setPriority, taskId = "" }) => {
	
	const dispatch = useAppDispatch()

	return (
		<input
		type="range"
		min="1"
		max="4"
		value={priority}
		className={`${styles.slider}`}
		onChange={(e) => {
			dispatch(changeTaskPriority({
				taskId: taskId,
				newPriority: +e.currentTarget.value
			}))
			setPriority(+e.currentTarget.value);
		}}
		/>
  );
};
