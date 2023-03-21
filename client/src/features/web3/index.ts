export { CampaignCard } from './components/CampaignCard/CampaignCard';
export { CreateCampaignForm } from './components/CreateCampaignForm/CreateCampaignForm';
export { DisplayCampaigns } from './components/DisplayCampaigns/DisplayCampaigns';

export type { ICampaign, ICreateCampaignFormData } from './models/web3Models';

// export { useWeb3Context, Web3ContextProvider } from './context/web3Context';
export { useWeb3 } from './hooks/useWeb3';

export {
  web3Reducer,
  setCampaigns,
  resetWeb3State,
  selectCampaigns,
} from './store/web3Slice';

export {
  calculateBarPercentage,
  checkIfImage,
  daysLeft,
} from './utils/web3Utils';
