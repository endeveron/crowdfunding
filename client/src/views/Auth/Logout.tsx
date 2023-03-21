import { Button } from 'components';
import { useAuth } from 'features/auth';

import './Auth.scss';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sign-out view fade">
      <div className="sign-out__title view__title">Log Out</div>

      <div className="sign-out__content view-content">
        <p className="sign-out__message">
          Are you leaving us already?
          <br />
          We will miss you.
        </p>
        <Button
          variant="contained"
          color="primary"
          className="sign-out__button"
          onClick={handleLogout}
        >
          Confirm Exit
        </Button>
      </div>
    </div>
  );
};

export { Logout };
