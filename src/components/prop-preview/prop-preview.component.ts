import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {
  Animations,
  BaseFormValueAccessorComponent,
  SafeHtmlPipe,
  SubmitBtnComponent,
} from '@shared';
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
export class PropPreviewComponent
  extends BaseFormValueAccessorComponent
  implements OnInit
{
  readonly #fb = inject(FormBuilder);

  public readonly propDetails: InputSignal<PropertyDetailsGroup | undefined> =
    input();

  public onNext: OutputEmitterRef<void> = output();

  public readonly PropertyDesignType = PropertyDesignType;

  public ngOnInit(): void {
    this.formGroup = this.#fb.nonNullable.control('', [Validators.required]);
  }
}
