import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Animations, SubmitBtnComponent } from '@shared';
import { PreStepFormGroup } from 'src/utils';
import { CreationType } from 'src/utils/enums';

const Components: Array<any> = [SubmitBtnComponent];

@Component({
  selector: 'pre-step',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './pre-step.component.html',
  styleUrl: './pre-step.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreStepComponent),
      multi: true,
    },
  ],
  animations: [Animations],
})
export class PreStepComponent implements ControlValueAccessor {
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly preStepFormGroup: FormGroup<PreStepFormGroup> =
    this.#fb.nonNullable.group({
      createType: ['', Validators.required],
      projectName: ['', Validators.required],
    });

  public readonly CreationType = CreationType;

  public get disableInputs(): boolean {
    return !this.preStepFormGroup.get('enabled')?.value;
  }

  public writeValue = (value: any): void => {
    this.preStepFormGroup.setValue(value);
  };

  public registerOnChange = (fn: Function): void => {
    this.preStepFormGroup.valueChanges?.subscribe((val) => fn(val));
  };

  public registerOnTouched = (fn: Function): void => {
    this.preStepFormGroup.valueChanges.subscribe((val) => fn(val));
  };

  private _resetForm = (): void => this.preStepFormGroup.reset({});
}
