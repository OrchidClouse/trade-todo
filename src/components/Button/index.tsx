import styles from './Button.module.scss'

interface IButtonProps{
	title: string;
	type?: 'primary' | 'default' | 'delete';
	disabled?: boolean;
	size?: 'small' | 'default' | 'large';
	onClick?: (e: React.MouseEvent) => void;
	className?: string;
}

export const Button: React.FC<IButtonProps> = ({
	title,
	type = 'default',
	disabled = false,
	size = 'default',
	onClick = () => {}
}) => {

  return (
	<button
		onClick={onClick}
		className={`${styles.button} ${styles[type]} ${styles[size]}`}
		disabled={disabled}
	>
		{title}
	</button>
  )
}
