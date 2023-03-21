export interface IFormFieldData {
  value: string;
  error: string | null;
}

type FormFieldType = 'text' | 'number' | 'email' | 'password';

export interface IFormField {
  name: string;
  label: string;
  type: FormFieldType;
  step?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  placeholder?: string;
  validator?: (fieldData: IFormFieldData) => void;
}

export interface IFormInputValues {
  [name: string]: string;
}

export interface IFormInputValuesMap {
  [name: string]: IFormFieldData;
}

export interface IFormProps<OutputData> {
  fields: IFormField[];
  isLoading: boolean;
  submitBtnLabel: string;
  onSubmit: (data: OutputData) => void;
}
