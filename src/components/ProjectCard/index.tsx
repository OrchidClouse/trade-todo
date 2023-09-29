import { Project } from 'types/Project';
import styles from './ProjectCard.module.scss'
import { useAppDispatch } from 'hooks/reduxHooks';
import { removeProject } from 'store/projects/projectsActions';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components';

interface IProjectCardProps{
	title: string;
	project: Project
}

export const ProjectCard: React.FC<IProjectCardProps> = ({
	title,
	project
}) => {

	const dispatch = useAppDispatch();
	const navigate = useNavigate()

	const handleProjectClick = () => {
		navigate(`/project/${project.id}`);
	};

	const handleDeleteProject = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(removeProject(project.id));
	};

  return (
	<div className={`${styles.projectCard}`} onClick={handleProjectClick}>
		<h2 className={`${styles.projectTitle}`}>{title}</h2>
		<div className={`${styles.separator}`}></div>
		<Button 
			title='Remove'
			type='delete'
			onClick={handleDeleteProject}
		/>
	</div>
  )
}

