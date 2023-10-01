import { Input } from "components"
import styles from './HidingFilter.module.scss'

interface IHidingFilterProps{
	title: string;
	placeholder?: string; 
	isSearchVisible: boolean;
	filterValue: string;
	setFilterValue: (value: string) => void;
	setIsSearchVisible: (value: boolean) => void;
}

export const HidingFilter: React.FC<IHidingFilterProps> = ({
	title,
	placeholder = "",
	filterValue,
	isSearchVisible,
	setFilterValue,
	setIsSearchVisible,
}) => {
	return (
		isSearchVisible ? (
		  <>
			<h3>{title}</h3>
			<Input 
			  value={filterValue}
			  placeholder={placeholder}
			  onChange={(e) => setFilterValue(e.target.value)}
			  onBlur={() => setIsSearchVisible(false)}
			  onKeyDown={(e) => {
				if(e.key === 'Enter') {
				  setIsSearchVisible(false)
				  setFilterValue("")
				}
			  }}
			/>
		  </>
		) : (
		  <button 
			className={`${styles.searchButton}`}
			onClick={() => setIsSearchVisible(true)}
		  >
		  </button>
		)
	  );
}
