import styles from './Input.module.scss'

interface IInputProps{
	type?: string,
	placeholder?: string,
	value?: string,
	onBlur?: () => void,
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	disabled?: boolean
  }
  
  export const Input: React.FC<IInputProps> = ({
	type = 'text',
	placeholder = '',
	value = '',
	onBlur = () => {},
	onKeyDown = (e) => {},
	onChange = () => {},
	disabled = false
  }) => {

	return (
	  <input 
		type={type}
		placeholder={placeholder}
		value={value}
		onBlur={onBlur}
		onKeyDown={onKeyDown}
		onChange={onChange}
		disabled={disabled}
		className={`${styles.defaultInput}`}
	  />
	)
  }
