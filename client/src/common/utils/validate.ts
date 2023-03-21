import { IFormFieldData } from 'common/types/form';

type ValidateInputArgs = {
  fieldData: IFormFieldData;
  regex: any;
  errMessage: string;
  keepCase?: boolean;
};

const getError = (args: ValidateInputArgs): string | null => {
  const { fieldData, regex, errMessage, keepCase } = args;
  const res = keepCase
    ? regex.test(fieldData.value)
    : regex.test(fieldData.value?.toLowerCase());
  return !res ? errMessage : null;
};

export const validateName = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^[a-zA-Z]{2,20}$/;
  const errMessage = '2-20 symbols, only latin letters';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateNumber = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^\d*(\.\d+){1,}$/;
  const errMessage = 'Please enter a value.';
  if (+fieldData.value < 0.01) {
    return {
      ...fieldData,
      error: 'Please enter a value at least 0.01',
    };
  }
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateUsername = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^[a-zA-Z]([.](?![.])|[a-zA-Z]){3,20}$/;
  const errMessage =
    "3-20 symbols, only latin letters and dot, such as 'john.dou'";
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateEmail = (fieldData: IFormFieldData): IFormFieldData => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errMessage = 'Invalid Email';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validatePassword = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
  const errMessage =
    '6-20 symbols, at least one numeric digit, one uppercase and one lowercase latin letter';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage, keepCase: true }),
  };
};

export const validateTitle = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^[a-zA-Z0-9 -]{2,30}$/;
  const errMessage =
    '2-30 symbols: only latin letters, digits and space allowed.';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateDescription = (
  fieldData: IFormFieldData
): IFormFieldData => {
  const regex = /^[a-zA-Z0-9 .,]{2,1000}$/;
  const errMessage =
    '2-300 symbols: only latin letters, digits, dot, comma and space allowed.';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateUrl = (fieldData: IFormFieldData): IFormFieldData => {
  const regex =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
  const errMessage = 'Invalid url.';
  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};

export const validateDate = (fieldData: IFormFieldData): IFormFieldData => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const errMessage = 'Invalid date. Please use MM/DD/YYYY format.';

  // Check if the date has expired.
  const date = new Date(fieldData.value);
  const isExpired = date < new Date();

  if (isExpired) {
    return {
      ...fieldData,
      error: 'Date is  expired. Please enter the date in future.',
    };
  }

  return {
    ...fieldData,
    error: getError({ fieldData, regex, errMessage }),
  };
};
