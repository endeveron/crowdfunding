import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  AuthForm,
  IAuthResData,
  IAuthReqData,
  useAuth,
  useSignupMutation,
  selectAuthToken,
} from 'features/auth';
import {
  validateEmail,
  validateName,
  validatePassword,
} from 'common/utils/validate';
import { LocationState } from 'common/types';
import { IFormField } from 'common/types/form';
import { useError } from 'common/hooks/useError';
import { useAppSelector } from 'store';

// import './Auth.scss';

const fields: IFormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validator: validateName,
    required: true,
    autoFocus: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validator: validateEmail,
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validator: validatePassword,
    required: true,
  },
];

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useSignupMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(to);
    }
  }, [token, navigate, to]);

  const handleSubmit = async (authReqData: IAuthReqData) => {
    try {
      const data: IAuthResData = await sendRequest(authReqData).unwrap();
      login(data, to);
    } catch (err: any) {
      handleApiError(err);
    }
  };

  return (
    <div className="auth view fade">
      <h2 className="auth__title">Sign Up</h2>
      <p className="auth__greeting-message">Create an account</p>

      <div className="auth__content view-content">
        <AuthForm
          fields={fields}
          isLoading={isLoading}
          submitBtnLabel="Sign Up"
          onSubmit={handleSubmit}
        />
        <div className="auth__link-wrapper">
          <Link to="/" state={state}>
            Already registered ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Signup };
