import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { v4 as uid } from 'uuid';

import { useForm } from 'common/hooks';
import { IFormField } from 'common/types/form';
import { validateNumber } from 'common/utils/validate';
import {
  Button,
  CountBox,
  FormField,
  Loading,
  Subtitle,
  useToast,
} from 'components';
import { daysLeft, selectCampaign, setCampaigns, useWeb3 } from 'features/web3';
import { useAppDispatch, useAppSelector } from 'store';

import './CampaignDetails.scss';

const fields: IFormField[] = [
  {
    name: 'donate',
    label: 'Fund the campaign',
    type: 'number',
    step: 0.01,
    placeholder: 'ETH 0.01',
    validator: validateNumber,
    required: true,
  },
];

const CampaignDetails = () => {
  const dispatch = useAppDispatch();

  const campaign = useAppSelector(selectCampaign)!;

  // // Get the campaign data from location.state
  // const { state } = useLocation();

  const { showToast } = useToast();
  const { address, contract, connect, donate, getCampaigns, getDonations } =
    useWeb3();

  const { inputValues, handleInputChange, validateInputs, resetForm } =
    useForm(fields);
  const [donatorList, setDonatorList] = useState<
    { donator: any; donation: string }[]
  >([]);
  const [donateLoading, setDonateLoading] = useState(false);
  const [donatorsLoading, setDonatorsLoading] = useState(false);

  // const campaign: ICampaign = state;

  const remainingDays = daysLeft(campaign.deadline);
  const showDonatorList = !!donatorList.length && donatorsLoading === false;
  const showNoDonatorsMessage =
    donatorList.length === 0 && donatorsLoading === false;

  const fetchDonators = async () => {
    try {
      setDonatorsLoading(true);
      const data = await getDonations(campaign.pId);

      if (data) {
        setDonatorList(data);
      }
    } catch (error) {
      console.error('fetchDonators', error);
      showToast('Could not fetch the list of donators.');
    } finally {
      setDonatorsLoading(false);
    }
  };

  // Initialize donators
  useEffect(() => {
    if (contract) fetchDonators();
  }, [address, contract]); // eslint-disable-line

  const handleDonate = async () => {
    if (!contract || !address) {
      showToast('Could not donate. Invalid contract or address data.');
      console.log('contract', contract);
      console.log('address', address);
      return;
    }

    let isValid = validateInputs();
    if (!isValid) return;

    const amount = +inputValues['donate'].value;
    if (!amount) {
      showToast('Invalid donate amount provided.');
    }

    try {
      setDonateLoading(true);

      const donateResult = await donate(campaign.pId, amount);
      if (donateResult === null) {
        showToast('Could not fund the campaign.');
        return;
      }

      // Update the donators list
      fetchDonators();

      // Update campaigns in the store
      const fetchedCampaigns = await getCampaigns();
      dispatch(setCampaigns(fetchedCampaigns));
      showToast('Successfully donated!.', 'success');
      resetForm();
    } catch (error) {
      console.error('handleDonate', error);
      showToast('Error. Please try again later.');
    } finally {
      setDonateLoading(false);
    }
  };

  const countBoxData = [
    {
      title: 'Days Left',
      value: remainingDays,
    },
    {
      title: `Raised of ${campaign.target}`,
      value: campaign.amountCollected,
    },
    {
      title: 'Total Backers',
      value: donatorList.length,
    },
  ];

  const noDonatorsMessage = (
    <div className="campaign-details__donators__message">
      No donators yet. Be the one!
    </div>
  );

  const connectButton = (
    <Button
      variant="contained"
      fullWidth={true}
      className="navbar__create-campaign"
      onClick={() => connect()}
    >
      Connect Wallet
    </Button>
  );

  const donateLoadingEl = (
    <div className="create-campaign-form__loading">
      <Loading />
    </div>
  );

  const donatorsLoadingEl = (
    <div className="campaign-details__loading campaign-details__loading--secondary">
      <Loading size="1.25rem" color="secondary" />
    </div>
  );

  return (
    <div className="campaign-details view">
      <h2 className="campaign-details__title view__title">{campaign.title}</h2>

      {/* Image + Stack of count boxes */}
      <div className="campaign-details__content-box campaign-details__content-box--main">
        <div className="campaign-details__image">
          <img src={campaign.image} alt={campaign.title} />
        </div>
        <div className="campaign-details__stack">
          {countBoxData.map((data) => (
            <CountBox title={data.title} value={data.value} key={uid()} />
          ))}
        </div>
      </div>

      <div className="campaign-details__layout">
        <div className="campaign-details__layout-item">
          {/* Donate */}
          <div className="campaign-details__content-box">
            <Subtitle text="donate" />
            <div
              className={classNames('campaign-details__donate', {
                'campaign-details__donate--loading': donateLoading,
              })}
            >
              <p className="campaign-details__donate-description campaign-details__description">
                Pledge without reward.
              </p>

              <div className="campaign-details__donate-input-wrapper">
                {fields.map((data) => (
                  <FormField
                    variant="outlined"
                    label={data.label}
                    name={data.name}
                    type={data.type}
                    step={data.step}
                    maxLength={data.maxLength}
                    minLength={data.minLength}
                    inputData={inputValues[data.name]}
                    onChange={handleInputChange}
                    fullWidth={true}
                    autoFocus={data.autoFocus}
                    required={data.required ? data.required : false}
                    key={data.name}
                    multiline={data.multiline}
                    placeholder={data.placeholder}
                  />
                ))}
              </div>

              <div className="campaign-details__donate-message">
                <p className="campaign-details__donate-title">
                  Back it because you believe in it.
                </p>
                <p className="campaign-details__donate-description">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <div className="campaign-details__donate-action-wrapper">
                {donateLoading ? (
                  donateLoadingEl
                ) : address ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={donateLoading}
                    fullWidth={true}
                    onClick={handleDonate}
                    className="campaign-details__donate__action-button fade"
                  >
                    Fund Campaign
                  </Button>
                ) : (
                  connectButton
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="campaign-details__layout-item">
          {/* Story */}
          <div className="campaign-details__content-box">
            <Subtitle text="story" />
            <p className="campaign-details__description">
              {campaign.description}
            </p>
          </div>

          {/* Creator */}
          <div className="campaign-details__content-box">
            <Subtitle text="creator" />
            <div className="campaign-details__description row">
              <div className="campaign-details__owner-name">
                {campaign.ownerName}
              </div>
              <div className="campaign-details__account-address">
                {campaign.owner}
              </div>
            </div>
          </div>

          {/* Donators */}
          <div className="campaign-details__content-box">
            <Subtitle text="donators" />
            {donatorsLoading && donatorsLoadingEl}

            {showDonatorList &&
              donatorList.map((data) => (
                <div className="campaign-details__donation" key={uid()}>
                  <div className="campaign-details__donation-amount">
                    {data.donation}
                  </div>
                  <div className="campaign-details__donation-account">
                    {data.donator}
                  </div>
                </div>
              ))}

            {showNoDonatorsMessage && noDonatorsMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CampaignDetails };
