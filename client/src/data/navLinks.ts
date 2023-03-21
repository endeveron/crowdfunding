import {
  CreateCampaignIcon,
  DashboardIcon,
  SignOutIcon,
  PaymentIcon,
  ProfileIcon,
  WithdrawIcon,
} from '../assets';

export const navLinks = [
  {
    name: 'dashboard',
    imgUrl: DashboardIcon,
    link: '/',
  },
  {
    name: 'create-campaign',
    imgUrl: CreateCampaignIcon,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: PaymentIcon,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: WithdrawIcon,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: ProfileIcon,
    link: '/profile',
  },
  {
    name: 'signout',
    imgUrl: SignOutIcon,
    link: '/sign-out',
  },
];
