import { NgClass } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IProperty } from 'src/utils';

@Component({
  selector: 'selection-property',
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, TranslateModule],
  template: `
    <label
      [ngClass]="{ 'border-lightBlue': isSelected() }"
      [attr.for]="property().name"
      class="h-40 w-52 flex flex-col justify-start items-stretch gap-1 md:p-3 p-2 mt-2 md:pb-4 shadow hover:shadow-lg cursor-pointer ease-in-out duration-200 rounded-lg border-[1px] border-[#F0F0F0]"
    >
      <input
        [checked]="isSelected()"
        type="checkbox"
        class="absolute -mt-2 -ms-2 w-5 h-5 text-lightBlue bg-[#F0F0F0] rounded-full focus:ring-0 ring-0 border-0"
      />

      <input
        [value]="property().name"
        [formControl]="formControl"
        [id]="property().name"
        type="radio"
        class="invisible"
      />

      <div class="flex flex-col justify-center items-center gap-2">
        <img
          [src]="property().icon"
          [alt]="property().name"
          class="h-[59px] w-[59px] rounded-[8px] bg-cover"
        />

        <span class="text-darkGray text-lg font-normal">
          {{ property().name | translate }}
        </span>
      </div>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionPropertyComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectionPropertyComponent),
      multi: true,
    },
  ],
})
export class SelectionPropertyComponent implements ControlValueAccessor {
  readonly #fb = inject(FormBuilder);

  public readonly property: InputSignal<IProperty> = input.required();
  public readonly isSelected: InputSignal<boolean> = input.required();

  public formControl: FormControl<string> =
    this.#fb.nonNullable.control<string>('');

  public onTouched: () => void = () => {};

  public writeValue(val: string): void {
    val && this.formControl.setValue(val, { emitEvent: true });
  }

  public registerOnChange(fn: () => void): void {
    this.formControl.valueChanges.subscribe(fn);
  }

  public registerOnTouched = (fn: () => void) => (this.onTouched = fn);

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  public validate(): ValidationErrors | null {
    return this.formControl.errors;
  }
}
