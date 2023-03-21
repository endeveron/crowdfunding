import { useAppDispatch, useAppSelector } from 'store';
import { selectThemeMode, setThemeMode } from 'store/ui';

const useTheme = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const toggleThemeMode = () => {
    dispatch(setThemeMode(themeMode === 'light' ? 'dark' : 'light'));
  };
  return { themeMode, toggleThemeMode };
};

export { useTheme };
