import { FormControl } from '@angular/forms';
import { CreationType, PropertyDesignType } from '../enums';

export interface HouseFormGroup {
  preStepFromGroup: FormControl<PreStepFormVm>;
  propertyPlace: FormControl<string>;
  propertyType: FormControl<string>;
  propertyDetailsForm: FormControl<PropertyDetailsFormGroup>;
  propertyDetailsType: FormControl<string | PropertyDesignType>;
}

export interface PreStepFormGroup {
  createType: FormControl<CreationType | string>;
  projectName: FormControl<string>;
}

export interface PreStepFormVm {
  createType: CreationType | string;
  projectName: string;
}

export interface PropertyDetailsFormGroup {
  description: string;
  detailedDescription: string;
}
