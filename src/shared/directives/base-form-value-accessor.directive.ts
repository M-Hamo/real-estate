import { Directive, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appBaseFormValueAccessor]',
  standalone: true,
})
export class BaseFormValueAccessorComponent
  implements ControlValueAccessor, Validator
{
  protected readonly fb = inject(FormBuilder);

  public formGroup!: FormGroup<any> | FormControl<any>;

  public onTouched: () => void = () => {};

  public writeValue(val: unknown): void {
    val && this.formGroup.patchValue(val, { emitEvent: true });
  }

  public registerOnChange(fn: () => void): void {
    this.formGroup.valueChanges?.subscribe(fn);
  }
  public get disableInputs(): boolean {
    return !this.formGroup.get('enabled')?.value;
  }

  public registerOnTouched = (fn: Function): void => {
    this.formGroup.valueChanges.subscribe((val) => fn(val));
  };

  private _resetForm = (): void => this.formGroup.reset();

  public validate(): ValidationErrors | null {
    return this.formGroup.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'Form fields are invalid',
          },
        };
  }
}
