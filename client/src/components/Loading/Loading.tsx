import { CircularProgress, Fade } from '@mui/material';

import './Loading.scss';

interface LoadingProps {
  delay?: boolean;
  size?: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

const Loading = (props: LoadingProps) => {
  const { delay, size, color } = props;

  return (
    <div className="loading">
      <Fade
        in={true}
        style={
          delay
            ? {
                transitionDelay: '1000ms',
              }
            : {}
        }
        unmountOnExit
      >
        <CircularProgress
          size={size || '1.75rem'}
          color={color || 'primary'}
          thickness={4}
        />
      </Fade>
    </div>
  );
};

export { Loading };
