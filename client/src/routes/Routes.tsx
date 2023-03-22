import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

import { Layout } from '../components';
import { selectAuthToken } from 'features/auth';
import { useAppSelector } from 'store';
import {
  Auth,
  CampaignDetails,
  CreateCampaign,
  Home,
  Login,
  Profile,
  Signup,
} from '../views';

const Routes = () => {
  const token = useAppSelector(selectAuthToken);

  const privateRoutes = (
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="campaign-details/:id" element={<CampaignDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>
  );

  const authRoutes = (
    <>
      <Route path="/" element={<Auth />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </>
  );

  return (
    <BrowserRouter>
      <ReactRoutes>{token ? privateRoutes : authRoutes}</ReactRoutes>
    </BrowserRouter>
  );
};

export { Routes };
