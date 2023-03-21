import { useMemo, useState } from 'react';

import { Navbar } from 'components';
import {
  DisplayCampaigns,
  ICampaign,
  selectCampaigns,
  useWeb3,
} from 'features/web3';
import { useAppSelector } from 'store';

import './Profile.scss';

const Profile = () => {
  const campaignsFromStore = useAppSelector(selectCampaigns);
  const { address } = useWeb3();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCampaigns: ICampaign[] = useMemo(() => {
    if (!campaignsFromStore) return [];

    const userCampaigns =
      campaignsFromStore?.filter((campaign) => campaign.owner === address) ||
      [];

    if (!userCampaigns) return [];
    if (searchQuery === '') return userCampaigns;

    return (
      userCampaigns?.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [address, campaignsFromStore, searchQuery]);

  return (
    <div className="profile view">
      <Navbar onSearchQuery={handleSearchQuery} />
      <DisplayCampaigns campaigns={filteredCampaigns} title="Your Campaigns" />
    </div>
  );
};

export { Profile };
