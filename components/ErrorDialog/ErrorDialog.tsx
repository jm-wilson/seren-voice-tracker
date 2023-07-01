import { ReactNode } from 'react';
import styles from './ErrorDialog.module.css';
import useImmediateModal from '@/utils/useImmediateModal';

const ErrorDialog: React.FC<{children?: ReactNode}> = ({children}) => {
  const modal = useImmediateModal();

  return (
    <dialog ref={modal} className={styles.dialog}>
      <h1>OUT OF ORDER 😢</h1>
      {children}
    </dialog>
  );
};

export default ErrorDialog;
