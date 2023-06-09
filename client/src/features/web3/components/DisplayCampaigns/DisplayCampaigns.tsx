import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'components';
import { CampaignCard, ICampaign, setCampaign } from 'features/web3';

import './DisplayCampaigns.scss';
import { useAppDispatch } from 'store';

interface IDisplayCampaignsProps {
  title: string;
  campaigns: ICampaign[];
  isLoading?: boolean;
}

const DisplayCampaigns = memo(
  ({ title, campaigns, isLoading }: IDisplayCampaignsProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const campaignsLength = campaigns?.length;

    const handleCampaignClick = (campaign: ICampaign) => {
      dispatch(setCampaign(campaign));
      navigate('/campaign-details');
    };

    const campaignsCountEl = !!campaignsLength && (
      <span className="display-campaigns__count">{campaignsLength}</span>
    );

    const loadingEl = (
      <div className="display-campaigns__loading">
        <Loading />
      </div>
    );

    const noCampaignsMessage = campaignsLength === 0 && (
      <div className="display-campaigns__message">
        There are no campaigns to display.
      </div>
    );

    return (
      <div className="display-campaigns">
        <h2 className="view__title">
          {title}
          {campaignsCountEl}
        </h2>

        {isLoading ? (
          loadingEl
        ) : (
          <div className="display-campaigns__campaigns-wrapper">
            {noCampaignsMessage}
            {campaigns?.map((campaign) => (
              <CampaignCard
                onClick={() => handleCampaignClick(campaign)}
                {...campaign}
                key={campaign.pId}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export { DisplayCampaigns };
