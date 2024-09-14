import { FormControl } from '@angular/forms';
import { CreationType } from '../enums';

export interface HouseFormGroup {
  preStepFromGroup: FormControl<PreStepFormVm>;
  propertyPlace: FormControl<string>;
  propertyType: FormControl<string>;
}

export interface PreStepFormGroup {
  createType: FormControl<CreationType | string>;
  projectName: FormControl<string>;
}

export interface PreStepFormVm {
  createType: CreationType | string;
  projectName: string;
}
