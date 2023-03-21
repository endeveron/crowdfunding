import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IFormField } from 'common/types/form';
import {
  validateDate,
  validateDescription,
  validateName,
  validateNumber,
  validateTitle,
  validateUrl,
} from 'common/utils/validate';
import { Button, useToast } from 'components';
import {
  checkIfImage,
  CreateCampaignForm,
  ICreateCampaignFormData,
  setCampaigns,
  useWeb3,
} from 'features/web3';
import { useAppDispatch } from 'store';

import './CreateCampaign.scss';

const fields: IFormField[] = [
  {
    name: 'ownerName',
    label: 'Your Name',
    type: 'text',
    required: true,
    autoFocus: true,
    validator: validateName,
  },
  {
    name: 'title',
    label: 'Campaign Title',
    type: 'text',
    required: true,
    validator: validateTitle,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    required: true,
    validator: validateTitle,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    multiline: true,
    validator: validateDescription,
  },
  {
    name: 'target',
    label: 'Goal',
    type: 'number',
    placeholder: 'ETH 0.50',
    validator: validateNumber,
    required: true,
  },

  {
    name: 'image',
    label: 'Image Url',
    type: 'text',
    required: true,
    validator: validateUrl,
  },
  {
    name: 'deadline',
    label: 'End Date',
    type: 'text',
    placeholder: 'MM/DD/YYYY',
    required: true,
    validator: validateDate,
  },
];

const CreateCampaign = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { address, createCampaign, connect, getCampaigns } = useWeb3();

  const updateStore = async () => {
    // Fetch new data
    const fetchedCampaigns = await getCampaigns();
    // Update redux store
    dispatch(setCampaigns(fetchedCampaigns));
  };

  const handleFormSubmit = async (formData: ICreateCampaignFormData) => {
    const handleError = () => {
      showToast('Could not create campaign.');
    };

    checkIfImage(formData?.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);
        try {
          const result = await createCampaign(formData);
          if (result?.receipt?.blockHash) {
            showToast('Campaign created.', 'success');
            await updateStore();
            navigate('/');
          } else {
            handleError();
          }
        } catch (error) {
          console.error('error', error);
          handleError();
        } finally {
          setIsLoading(false);
        }
      } else {
        showToast('Provide a valid image url.');
      }
    });
  };

  const connectEl = (
    <div className="create-campaign__connect">
      <div className="create-campaign__connect__message">
        Please connect your wallet to create a campaign.
      </div>
      <Button
        variant="contained"
        className="create-campaign__connect__button"
        onClick={() => connect()}
      >
        Connect Wallet
      </Button>
    </div>
  );

  return (
    <div className="create-campaign view">
      <div className="create-campaign__title view__title">Start a Campaign</div>
      {address ? (
        <CreateCampaignForm
          fields={fields}
          isLoading={isLoading}
          submitBtnLabel="Create campaign"
          onSubmit={handleFormSubmit}
        />
      ) : (
        connectEl
      )}
    </div>
  );
};

export { CreateCampaign };
