import { useEffect, useMemo, useState } from 'react';

import { Navbar } from 'components';
import {
  DisplayCampaigns,
  ICampaign,
  selectCampaigns,
  setCampaigns,
  useWeb3,
} from 'features/web3';
import { useAppDispatch, useAppSelector } from 'store';

import './Home.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  const { contract, getCampaigns } = useWeb3();
  const campaignsFromStore = useAppSelector(selectCampaigns);

  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCampaigns: ICampaign[] = useMemo(() => {
    if (!campaignsFromStore) return [];
    if (searchQuery === '') return campaignsFromStore;
    return (
      campaignsFromStore?.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [campaignsFromStore, searchQuery]);

  const fetchCampaigns = async () => {
    if (campaignsFromStore?.length) return;

    try {
      setIsLoading(true);
      const fetchedCampaigns = await getCampaigns();
      dispatch(setCampaigns(fetchedCampaigns));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [contract]); // eslint-disable-line

  return (
    <div className="home view">
      <Navbar onSearchQuery={handleSearchQuery} />
      <DisplayCampaigns
        campaigns={filteredCampaigns}
        title="All Campaigns"
        isLoading={isLoading}
      />
    </div>
  );
};

export { Home };
