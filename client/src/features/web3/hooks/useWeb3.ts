import { utils } from 'ethers';

import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from '@thirdweb-dev/react';

import { useToast } from 'common/hooks';
import { ICampaign, ICreateCampaignFormData } from 'features/web3';
import { ICreateCampaignFetchedData } from 'features/web3/models/web3Models';

const useWeb3 = () => {
  const { showToast } = useToast();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress(); // Address of smart wallet
  const connect = useMetamask(); // Connect smart wallet

  const publishCampaign = async (data: ICreateCampaignFormData) => {
    try {
      const result = await createCampaign([
        address, // owner
        data.ownerName,
        data.title,
        data.category,
        data.description,
        utils.parseUnits(data.target.toString(), 18),
        new Date(data.deadline).getTime(),
        data.image,
      ]);
      return result;
    } catch (error) {
      showToast('Could not create campaign.');
      console.error('publishCampaign', error);
    }
  };

  const getCampaigns = async (): Promise<ICampaign[]> => {
    if (!contract) return [];
    try {
      const campaigns: ICreateCampaignFetchedData[] = await contract.call(
        'getCampaigns'
      );

      const parsedCampaings = campaigns.map((campaign, i) => {
        return {
          owner: campaign.owner,
          ownerName: campaign.ownerName,
          category: campaign.category,
          title: campaign.title,
          description: campaign.description,
          target: +utils.formatEther(campaign.target),
          deadline: +campaign.deadline,
          amountCollected: +utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        };
      });

      return parsedCampaings;
    } catch (error) {
      showToast('Could not fetch campaigns.');
      console.error('getCampaigns', error);
    }

    return [];
  };

  const donate = async (pId: number, amount: number): Promise<void> => {
    if (!contract || !address) {
      showToast('Could not donate. Invalid contract data.');
      return;
    }
    let data = null;
    try {
      data = await contract.call('donateCampaign', pId, {
        value: utils.parseEther(amount.toString()),
      });
    } catch (error) {
      console.error('useWeb3 donate', error);
      showToast('Error. Please try again later.');
    }
    return data;
  };

  const getDonations = async (
    pId: number
  ): Promise<{ donator: any; donation: string }[]> => {
    if (!contract) {
      showToast('Could not get donations. Invalid contract data.');
      return [];
    }

    try {
      let parsedDonations = [];
      const donations = await contract.call('getDonators', pId);
      const numberOfDonations = donations[0].length;

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error('useWeb3 getDonations', error);
      showToast('Error. Please try again later.');
      return [];
    }
  };

  return {
    address,
    contract,
    connect,
    createCampaign: publishCampaign,
    getCampaigns,
    donate,
    getDonations,
  };
};

export { useWeb3 };
