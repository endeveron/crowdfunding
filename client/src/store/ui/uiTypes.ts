import { IToastContent, ISnackbarContent, TSnackbarAction } from 'components';

interface IsOpen {
  isOpen: boolean;
}

interface IToast extends IsOpen {
  content: IToastContent;
}

interface ISnackbar extends IsOpen {
  content: ISnackbarContent;
  action: TSnackbarAction;
}

export type ThemeMode = 'light' | 'dark';

export interface UiState {
  themeMode: ThemeMode;
  toast: IToast;
  sidebar: IsOpen;
  snackbar: ISnackbar;
}
