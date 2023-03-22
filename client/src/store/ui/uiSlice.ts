import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ThemeMode, UiState } from 'store/ui';
import { IToastContent, ISnackbarContent, TSnackbarAction } from 'components';

const mainMenuInitialState = {
  isOpen: false,
};

const snackbarInitialState = {
  action: null,
  content: {
    message: '',
    btnTitle: '',
  },
  isOpen: false,
};

const toastInitialState = {
  content: {
    message: '',
  },
  isOpen: false,
};

const initialState: UiState = {
  themeMode: 'dark',
  toast: toastInitialState,
  snackbar: snackbarInitialState,
  sidebar: mainMenuInitialState,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },

    openToast: (state, action: PayloadAction<IToastContent>) => {
      state.toast.content = action.payload;
      state.toast.isOpen = true;
    },
    closeToast: (state) => {
      state.toast = toastInitialState;
    },

    openSnackbar: (state, action: PayloadAction<ISnackbarContent>) => {
      state.snackbar.content.message = action.payload.message;
      state.snackbar.content.btnTitle = action.payload.btnTitle;
      state.snackbar.isOpen = true;
    },
    setSnackbarAction: (state, action: PayloadAction<TSnackbarAction>) => {
      state.snackbar.action = action.payload;
    },
    closeSnackbar: (state) => {
      state.snackbar = snackbarInitialState;
    },

    openSidebar: (state) => {
      state.sidebar.isOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },

    clearUiState: () => initialState,
  },
});

const uiReducer = uiSlice.reducer;

export const {
  setThemeMode,
  openToast,
  closeToast,
  openSidebar,
  closeSidebar,
  openSnackbar,
  setSnackbarAction,
  closeSnackbar,
} = uiSlice.actions;

export const selectThemeMode = (state: RootState) => state.ui.themeMode;
export const selectToastContent = (state: RootState) => state.ui.toast.content;
export const selectToastIsOpen = (state: RootState) => state.ui.toast.isOpen;
export const selectSnackbarAction = (state: RootState) =>
  state.ui.snackbar.action;
export const selectSnackbarContent = (state: RootState) =>
  state.ui.snackbar.content;
export const selectSnackbarIsOpen = (state: RootState) =>
  state.ui.snackbar.isOpen;
export const selectSidebarIsOpen = (state: RootState) =>
  state.ui.sidebar.isOpen;

export { uiReducer };
