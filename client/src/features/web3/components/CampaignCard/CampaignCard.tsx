import { ICampaign } from 'features/web3';
import { daysLeft } from 'features/web3';

import './CampaignCard.scss';

interface CampaignCardProps extends ICampaign {
  onClick: () => void;
}

const CampaignCard = ({
  owner,
  ownerName,
  category,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  onClick,
}: CampaignCardProps) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div onClick={onClick} className="campaign-card">
      <img src={image} alt={title} className="campaign-card__image" />
      <div className="campaign-card__category-container">
        <div className="campaign-card__category">{category}</div>
      </div>

      <div className="campaign-card__content">
        <h3 className="campaign-card__title">{title}</h3>
        <p className="campaign-card__description">{description}</p>

        <div className="campaign-card__owner campaign-card__description">
          Created by {ownerName}
        </div>

        <div className="campaign-card__stack">
          <div className="campaign-card__stack-item main">
            <div className="campaign-card__stack-value">{amountCollected}</div>
            <div className="campaign-card__stack-description">
              raised of {target}
            </div>
          </div>
          <div className="campaign-card__stack-item">
            <div className="campaign-card__stack-value">{remainingDays}</div>
            <div className="campaign-card__stack-description">days left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CampaignCard };
