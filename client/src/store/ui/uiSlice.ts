import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ThemeMode, UiState } from 'store/ui';
import { ToastContent } from 'components';

const mainMenuInitialState = {
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
  sidebar: mainMenuInitialState,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },

    openToast: (state, action: PayloadAction<ToastContent>) => {
      state.toast.content = action.payload;
      state.toast.isOpen = true;
    },
    closeToast: (state) => {
      state.toast = toastInitialState;
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
} = uiSlice.actions;

export const selectThemeMode = (state: RootState) => state.ui.themeMode;
export const selectToastContent = (state: RootState) => state.ui.toast.content;
export const selectToastIsOpen = (state: RootState) => state.ui.toast.isOpen;
export const selectSidebarIsOpen = (state: RootState) =>
  state.ui.sidebar.isOpen;

export { uiReducer };
