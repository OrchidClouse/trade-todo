import styles from './index.module.scss'
import {Helmet} from 'react-helmet'

export const ProjectPage = () => {
  return (
  <>
    <Helmet>
      <title>Project</title>
    </Helmet>
    <div className={`${styles.test2}`}>ProjectPage</div>
  </>    
  )
}
