import { BigNumber } from 'ethers';

interface ICampaignCommon {
  title: string;
  description: string;
  target: number;
  ownerName: string;
  category: string;
  image: string;
}

// Create campaign form / request data
export interface ICreateCampaignFormData extends ICampaignCommon {
  deadline: string;
}

// Create campaign response data
// TODO: assign type to donators, donations
export interface ICreateCampaignFetchedData extends ICampaignCommon {
  deadline: BigNumber;
  donators: [];
  donations: number[];
  owner: string;
  amountCollected: number;
}

// Campaign item in the store
export interface ICampaign
  extends Omit<
    ICreateCampaignFetchedData,
    'deadline' | 'donators' | 'donations'
  > {
  pId: number;
  deadline: number;
}

// Redux slice
export interface IWeb3Slice {
  campaigns: ICampaign[] | null;
}
