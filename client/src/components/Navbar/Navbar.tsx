import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button/Button';
import { Search } from 'components/Search/Search';
import { selectCampaigns, useWeb3 } from 'features/web3';
import { useAppSelector } from 'store';

import './Navbar.scss';
import { AddIcon, ConnectIcon } from 'assets';

interface INavbarProps {
  onSearchQuery: (query: string) => void;
}

const Navbar = ({ onSearchQuery }: INavbarProps) => {
  const navigate = useNavigate();

  const { connect, address } = useWeb3();
  const campaigns = useAppSelector(selectCampaigns);

  const handleSearch = (query: string) => {
    onSearchQuery(query);
  };

  const handleWeb3Action = () => {
    if (address) {
      navigate('/create-campaign');
    } else {
      connect();
    }
  };

  const createEl = (
    <>
      <AddIcon className="navbar__action-icon" />
      <span className="navbar__action-title">Create</span>
      <span className="navbar__action-title navbar__action-title--extra">
        Campaign
      </span>
    </>
  );

  const connectEl = (
    <>
      <ConnectIcon className="navbar__action-icon" />
      <span className="navbar__action-title">Connect</span>
      <span className="navbar__action-title navbar__action-title--extra">
        Wallet
      </span>
    </>
  );

  const web3Action = (
    <Button
      variant="contained"
      className="navbar__action"
      onClick={handleWeb3Action}
    >
      {address ? createEl : connectEl}
    </Button>
  );

  return (
    <div className="navbar">
      <div className="navbar__content">
        {!!campaigns?.length && (
          <Search
            onChange={handleSearch}
            placeholder="Search for campaigns"
            className="navbar__search"
          />
        )}
        {web3Action}
      </div>
    </div>
  );
};

export { Navbar };
