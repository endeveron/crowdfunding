import { ToastContent } from 'components';

interface IsOpen {
  isOpen: boolean;
}

interface Toast extends IsOpen {
  content: ToastContent;
}

export type ThemeMode = 'light' | 'dark';

export interface UiState {
  themeMode: ThemeMode;
  toast: Toast;
  sidebar: IsOpen;
}
