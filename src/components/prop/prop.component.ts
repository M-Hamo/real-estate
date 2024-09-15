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
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import { Animations, SubmitBtnComponent } from '@shared';
import { AngularEditorConf } from 'src/utils';

const Components: Array<any> = [SubmitBtnComponent, AngularEditorModule];

@Component({
  selector: 'prop',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './prop.component.html',
  styleUrl: './prop.component.scss',
  animations: [Animations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropComponent),
      multi: true,
    },
  ],
})
export class PropComponent implements ControlValueAccessor {
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly propFormGroup: FormGroup<any> = this.#fb.nonNullable.group({
    description: ['', [Validators.required]],
    detailedDescription: '',
  });

  public readonly AngularEditorConf = AngularEditorConf;

  public get disableInputs(): boolean {
    return !this.propFormGroup.get('enabled')?.value;
  }

  public writeValue = (val: any): void => {
    val && this.propFormGroup.setValue(val, { emitEvent: true });
  };

  public registerOnChange = (fn: Function): void => {
    this.propFormGroup.valueChanges?.subscribe((val) => fn(val));
  };

  public registerOnTouched = (fn: Function): void => {
    this.propFormGroup.valueChanges.subscribe((val) => fn(val));
  };

  private _resetForm = (): void => this.propFormGroup.reset();
}
