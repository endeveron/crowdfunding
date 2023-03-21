import { useToast } from 'components';

import { MuiThemeProvider } from 'features/muiTheme';
import { Routes } from './routes/Routes';

import 'App.scss';

const App = () => {
  const { Toast } = useToast();

  return (
    <MuiThemeProvider>
      <Toast />
      <Routes />
    </MuiThemeProvider>
  );
};

export default App;
