import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
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
  SubmitBtnComponent,
} from '@shared';
import { CreationType } from 'src/utils';

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
export class PreStepComponent
  extends BaseFormValueAccessorComponent
  implements OnInit
{
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly CreationType = CreationType;

  public ngOnInit(): void {
    this.formGroup = this.#fb.nonNullable.group({
      createType: ['', Validators.required],
      projectName: ['', Validators.required],
    });
  }
}
