import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button/Button';
import { Search } from 'components/Search/Search';
import { selectCampaigns, useWeb3 } from 'features/web3';
import { useAppSelector } from 'store';

import './Navbar.scss';

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

  const handleWeb3Button = () => {
    if (address) {
      navigate('/create-campaign');
    } else {
      connect();
    }
  };

  const web3Button = (
    <Button
      variant="contained"
      className="navbar__create-campaign"
      onClick={handleWeb3Button}
    >
      {address ? 'Create' : 'Connect'}
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
        {web3Button}
      </div>
    </div>
  );
};

export { Navbar };
