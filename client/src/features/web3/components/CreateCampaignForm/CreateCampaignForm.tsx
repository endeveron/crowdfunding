import classNames from 'classnames';
import { useForm } from 'common/hooks';
import { IFormInputValuesMap, IFormProps } from 'common/types/form';
import { Button, FormField, Loading } from 'components';
import { ICreateCampaignFormData } from 'features/web3';

import './CreateCampaignForm.scss';

const CreateCampaignForm = ({
  fields,
  isLoading,
  submitBtnLabel,
  onSubmit,
}: IFormProps<ICreateCampaignFormData>) => {
  const { inputValues, handleInputChange, validateInputs } = useForm(fields);

  const handleSubmit = async () => {
    let isValid = validateInputs();
    if (!isValid) return;

    const prepareOutputData = (inputValues: IFormInputValuesMap) => {
      let outputData = {} as ICreateCampaignFormData;

      for (let name in inputValues) {
        const fieldData = inputValues[name];
        outputData = {
          ...outputData,
          [name]: fieldData.value,
        };
      }

      return outputData;
    };

    const outputData = prepareOutputData(inputValues);
    onSubmit(outputData);
  };

  const loadingEl = (
    <div className="create-campaign-form__loading">
      <Loading />
    </div>
  );

  const submitButtonEl = (
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading}
      fullWidth={false}
      onClick={handleSubmit}
      className="create-campaign-form__button fade"
    >
      {submitBtnLabel}
    </Button>
  );

  return (
    <form className="create-campaign-form" autoComplete="off" noValidate>
      <div
        className={classNames('create-campaign-form__fields-wrapper', {
          'create-campaign-form__fields-wrapper--loading': isLoading,
        })}
      >
        {fields.map((data) => (
          <FormField
            variant="outlined"
            label={data.label}
            name={data.name}
            type={data.type}
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
      <div className="create-campaign-form__actions-wrapper">
        {isLoading ? loadingEl : submitButtonEl}
      </div>
    </form>
  );
};

export { CreateCampaignForm };
