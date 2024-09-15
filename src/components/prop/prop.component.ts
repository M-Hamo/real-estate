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
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
import {
  Animations,
  BaseFormValueAccessorComponent,
  SubmitBtnComponent,
} from '@shared';
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
export class PropComponent
  extends BaseFormValueAccessorComponent
  implements OnInit
{
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly AngularEditorConf = AngularEditorConf;

  public ngOnInit(): void {
    this.formGroup = this.#fb.nonNullable.group({
      description: ['', [Validators.required]],
      detailedDescription: '',
    });
  }
}
