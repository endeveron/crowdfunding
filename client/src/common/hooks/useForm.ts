import { useState } from 'react';

import {
  IFormFieldData,
  IFormField,
  IFormInputValuesMap,
  IFormInputValues,
} from 'common/types/form';

export interface FieldValidatorMap {
  [name: string]: (fieldData: IFormFieldData) => IFormFieldData;
}

const initialValue: IFormFieldData = {
  value: '',
  error: null,
};

const initValues = (fields: IFormField[]) => {
  return fields.reduce(
    (acc, item) => ({
      ...acc,
      [item.name]: initialValue,
    }),
    {}
  );
};

export const useForm = (fields: IFormField[]) => {
  const initialValues: IFormInputValuesMap = initValues(fields);
  const [inputValues, setInputValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    let inputValue;

    if (e.target.type === 'checkbox') {
      inputValue = checked ? '1' : '0';
    } else {
      inputValue = value;
    }

    setInputValues({
      ...inputValues,
      [name]: {
        value: inputValue,
        error: null,
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let isValid = true;

    // Create the map of the validation functions
    const createFieldValidatorMap = (fields: IFormField[]): FieldValidatorMap =>
      fields.reduce((acc, cur) => {
        if (cur?.validator) {
          return {
            ...acc,
            [cur.name]: cur.validator,
          };
        } else {
          return acc;
        }
      }, {});
    const validatorMap = createFieldValidatorMap(fields);

    // Validate the form fields
    let updInputValues: IFormInputValuesMap = JSON.parse(
      JSON.stringify(inputValues)
    );

    for (const name in updInputValues) {
      const formFieldData = updInputValues[name];
      const validatorFn = validatorMap[name];

      if (validatorFn) {
        // Update the `error` key
        const updFormFieldData = validatorFn(formFieldData);
        updInputValues[name] = updFormFieldData;

        if (updInputValues[name].error) {
          isValid = false;
        }
      }
    }

    setInputValues(updInputValues);
    return isValid;
  };

  const updateInputValues = (newInputValues: IFormInputValues) => {
    let updInputValues: IFormInputValuesMap = JSON.parse(
      JSON.stringify(inputValues)
    );

    for (const name in updInputValues) {
      if (newInputValues[name]) {
        updInputValues[name].value = newInputValues[name];
      }
    }

    setInputValues(updInputValues);
  };

  const resetForm = () => {
    setInputValues(initialValues);
  };

  return {
    inputValues,
    handleInputChange,
    handleClickShowPassword,
    showPassword,
    updateInputValues,
    validateInputs,
    resetForm,
  };
};
