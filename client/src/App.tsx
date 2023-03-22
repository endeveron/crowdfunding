import { useEffect } from 'react';

import { useServiceWorker } from 'common/hooks/useServiceWorker';
import { useSnackbar, useToast } from 'components';
import { MuiThemeProvider } from 'features/muiTheme';
import { Routes } from './routes/Routes';
import { useAppDispatch } from 'store';
import { setSnackbarAction } from 'store/ui';

import 'App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const { Toast } = useToast();

  // Handle app update
  const { Snackbar: UpdateAppSnackbar } = useSnackbar(() =>
    dispatch(setSnackbarAction('updateApp'))
  );
  useServiceWorker();

  useEffect(() => {
    console.log('app version 85');
  }, []);

  return (
    <MuiThemeProvider>
      <Toast />
      <UpdateAppSnackbar />
      <Routes />
    </MuiThemeProvider>
  );
};

export default App;
