import { ReactNode, MouseEvent } from 'react';
import styles from './Modal.module.scss';

interface IModalProps {
  opened: boolean;
  onClose(): void;
  title?: ReactNode;
  children?: ReactNode;
}

export const Modal: React.FC<IModalProps> = ({
	opened,
	onClose = () => {},
	title = '',
	children
}) => {

  const handleAreaClick = (e: MouseEvent) => {
    onClose();
  };

  if (!opened) return null;

  return (
    <div className={styles.container} onClick={handleAreaClick}>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          {title ? <div className={styles.title}>{title}</div> : null}
          <button className={styles.closeButton} onClick={onClose}>
            {String.fromCharCode(10006)}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};