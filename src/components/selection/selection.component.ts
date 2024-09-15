import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  Signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  Animations,
  BaseFormValueAccessorComponent,
  SelectionPropertyComponent,
  StarTitle,
  StarTitleComponent,
  SubmitBtnComponent,
} from '@shared';
import { IProperty } from 'src/utils';
import {
  FormBuilder,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const Components: Array<any> = [
  SelectionPropertyComponent,
  StarTitleComponent,
  SubmitBtnComponent,
];

@Component({
  selector: 'selection',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
  animations: [Animations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionComponent),
      multi: true,
    },
  ],
})
export class SelectionComponent
  extends BaseFormValueAccessorComponent
  implements OnInit
{
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly propertiesList: Signal<IProperty[]> = signal([
    {
      icon: 'assets/icons/Group 1000017644.svg',
      name: 'selection_step.cairo',
    },
    {
      icon: 'assets/icons/Group 100001764l.svg',
      name: 'selection_step.north_coast',
    },
    {
      icon: 'assets/icons/Group 1000017643.svg',
      name: 'selection_step.dhb',
    },
  ]);

  public readonly starTitle: Signal<StarTitle> = signal({
    title: 'selection_step.title',
    description: 'selection_step.description',
  });

  public ngOnInit(): void {
    this.formGroup = this.#fb.nonNullable.control('', [Validators.required]);
  }
}
