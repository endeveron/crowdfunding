import { ISnackbarContent } from 'components';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  closeSnackbar,
  openSnackbar,
  selectSnackbarContent,
  selectSnackbarIsOpen,
} from 'store/ui';

import { Snackbar as SnackbarEl } from '../../components/snackbar/Snackbar/Snackbar';

export const useSnackbar = (actionCallback?: () => void) => {
  const dispatch = useAppDispatch();

  // content: { message, btnTitle }
  const content = useAppSelector(selectSnackbarContent);
  const isOpen = useAppSelector(selectSnackbarIsOpen);

  const handleAccept = () => {
    dispatch(closeSnackbar());
    actionCallback && actionCallback();
  };

  const Snackbar = () => (
    <SnackbarEl content={content} isOpen={isOpen} onAccept={handleAccept} />
  );

  const showSnackbar = ({ message, btnTitle = 'OK' }: ISnackbarContent) => {
    if (!message.trim()) {
      throw new Error('Provide a snackbar message.');
    }

    dispatch(
      openSnackbar({
        message,
        btnTitle,
      })
    );
  };

  return { showSnackbar, Snackbar };
};
