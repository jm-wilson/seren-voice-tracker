import { useEffect, useRef } from 'react';

const useImmediateModal = () => {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal.current && !modal.current.open) modal.current.showModal();
  });

  return modal;
};

export default useImmediateModal;
