import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  AuthForm,
  IAuthResData,
  IAuthReqData,
  useAuth,
  useLoginMutation,
  selectAuthToken,
} from 'features/auth';
import { validateEmail, validatePassword } from 'common/utils/validate';
import { LocationState } from 'common/types';
import { IFormField } from 'common/types/form';
import { useError } from 'common/hooks/useError';
import { useAppSelector } from 'store';

const fields: IFormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    autoFocus: true,
    validator: validateEmail,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    validator: validatePassword,
  },
];

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useLoginMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(to, { state: { from: '/' } });
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
      <h2 className="auth__title">log In</h2>
      <p className="auth__greeting-message">Nice to meet you again</p>

      <div className="auth__content view-content">
        <AuthForm
          fields={fields}
          isLoading={isLoading}
          submitBtnLabel="log In"
          onSubmit={handleSubmit}
        />
        <div className="auth__link-wrapper">
          <Link to="/auth/signup" state={state}>
            Don't have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };
