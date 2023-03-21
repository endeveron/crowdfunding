import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'components';
import { CampaignCard, ICampaign } from 'features/web3';

import './DisplayCampaigns.scss';

interface IDisplayCampaignsProps {
  title: string;
  campaigns: ICampaign[];
  isLoading?: boolean;
}

const DisplayCampaigns = memo(
  ({ title, campaigns, isLoading }: IDisplayCampaignsProps) => {
    const navigate = useNavigate();

    const campaignsLength = campaigns?.length;

    const handleCampaignClick = (campaign: ICampaign) => {
      navigate(`/campaign-details/${campaign.title}`, {
        state: campaign,
      });
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
      <div className="display-campaigns__empty">
        There are no campaigns to display.
      </div>
    );

    return (
      <div className="display-campaigns">
        <div className="view__title">
          {title}
          {campaignsCountEl}
        </div>

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
