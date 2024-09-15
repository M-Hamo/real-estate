import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Animations, SafeHtmlPipe, SubmitBtnComponent } from '@shared';
import {
  PropertyDesignType,
  PropertyDetailsFormGroup as PropertyDetailsGroup,
} from 'src/utils';

const Components: Array<any> = [SubmitBtnComponent];
const Pipes: Array<any> = [SafeHtmlPipe];

@Component({
  selector: 'prop-preview',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    Pipes,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './prop-preview.component.html',
  styleUrl: './prop-preview.component.scss',
  animations: [Animations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropPreviewComponent),
      multi: true,
    },
  ],
})
export class PropPreviewComponent implements ControlValueAccessor {
  readonly #fb = inject(FormBuilder);

  public readonly propDetails: InputSignal<PropertyDetailsGroup | undefined> =
    input();

  public onNext: OutputEmitterRef<void> = output();

  public readonly propertyDesignControl: FormControl<string> =
    this.#fb.nonNullable.control('', [Validators.required]);

  public readonly PropertyDesignType = PropertyDesignType;

  public get disableInputs(): boolean {
    return !this.propertyDesignControl.get('enabled')?.value;
  }

  public writeValue = (val: any): void => {
    val && this.propertyDesignControl.setValue(val, { emitEvent: true });
  };

  public registerOnChange = (fn: Function): void => {
    this.propertyDesignControl.valueChanges?.subscribe((val) => fn(val));
  };

  public registerOnTouched = (fn: Function): void => {
    this.propertyDesignControl.valueChanges.subscribe((val) => fn(val));
  };

  private _resetForm = (): void => this.propertyDesignControl.reset();
}
