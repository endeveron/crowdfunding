import { AlertColor } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/store';
import { openToast, selectToastContent, selectToastIsOpen } from 'store/ui';

import { Toast as ToastEl } from '../../components/toast/Toast/Toast';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectToastContent);
  const isOpen = useAppSelector(selectToastIsOpen);

  const Toast = () => <ToastEl content={content} isOpen={isOpen} />;

  const showToast = (message: string, status: AlertColor = 'error') => {
    if (!message.trim()) {
      throw new Error('Provide toast message.');
    }

    dispatch(
      openToast({
        status,
        message,
      })
    );
  };

  return { showToast, Toast };
};
