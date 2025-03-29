export interface UIObjectConfigDto {
  objectType: string;
  title: string;
  layoutStyle: string;
  fieldGroups?: UIFieldGroupDto[];
  fields?: UIFieldDto[];
}

export interface UIFieldGroupDto {
  name: string;
  label: string;
  order?: number;
  fields: UIFieldDto[];
}

export interface UIFieldDto {
  name: string;
  label: string;
  type: UIFieldType;
  required: boolean;
  defaultValue?: any;
  placeholder?: string;
  referenceObjectType?: string;
  order?: number;
  componentType?: string;
  validations?: UIFieldValidationDto[];
}

export interface UIFieldValidationDto {
  type: ValidationType;
  value?: string | number;
}

export enum UIFieldType {
  Text = "Text",
  Number = "Number",
  Date = "Date",
  Checkbox = "Checkbox",
  Dropdown = "Dropdown",
}

export enum ValidationType {
  Required = "Required",
  MinLength = "MinLength",
  MaxLength = "MaxLength",
  Pattern = "Pattern",
}
