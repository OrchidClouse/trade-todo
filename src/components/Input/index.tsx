import styles from './Input.module.scss'

interface IInputProps{
	type?: string;
	placeholder?: string;
	value?: string;
	onBlur?: () => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	id?: string;
	size?: 'small' | 'medium' | 'large';
  }
  
  export const Input: React.FC<IInputProps> = ({
	type = 'text',
	placeholder = '',
	value = '',
	onBlur = () => {},
	onKeyDown = (e) => {},
	onChange = () => {},
	disabled = false,
	id = "",
	size = 'default'
  }) => {
	const sizeClass = {
		small: styles.smallInput,
		default: styles.defaultInput,
		large: styles.largeInput,
	}[size];

	return (
	  <input
		type={type}
		placeholder={placeholder}
		value={value}
		onBlur={onBlur}
		onKeyDown={onKeyDown}
		onChange={onChange}
		disabled={disabled}
		className={sizeClass}
		id={id}
	  />
	)
  }
