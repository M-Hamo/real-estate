import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  signal,
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
  SelectionPropertyComponent,
  StarTitle,
  StarTitleComponent,
  SubmitBtnComponent,
} from '@shared';
import { IProperty } from 'src/utils';

const Components: Array<any> = [
  SelectionPropertyComponent,
  StarTitleComponent,
  SubmitBtnComponent,
];

@Component({
  selector: 'selection-two',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './selection-two.component.html',
  styleUrl: './selection-two.component.scss',
  animations: [Animations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionTwoComponent),
      multi: true,
    },
  ],
})
export class SelectionTwoComponent
  extends BaseFormValueAccessorComponent
  implements OnInit
{
  readonly #fb = inject(FormBuilder);

  public onNext: OutputEmitterRef<void> = output();

  public readonly propertiesList: Signal<IProperty[]> = signal([
    {
      icon: 'assets/icons/Group 1000017847.svg',
      name: 'selection_step.property1',
    },
    {
      icon: 'assets/icons/Group 10000176436.svg',
      name: 'selection_step.property2',
    },
    {
      icon: 'assets/icons/Group 10000176444.svg',
      name: 'selection_step.property3',
    },
  ]);

  public readonly starTitle: Signal<StarTitle> = signal({
    title: 'selection_step.selection_two_title',
    description: 'selection_step.description',
  });

  public ngOnInit(): void {
    this.formGroup = this.#fb.nonNullable.control('', [Validators.required]);
  }
}
