import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PreStepComponent } from '../pre-step/pre-step.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HouseFormGroup } from 'src/utils';
import { tap } from 'rxjs/operators';
import { Animations, DialogComponent } from '@shared';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { SelectionComponent } from '../selection/selection.component';
import { SelectionTwoComponent } from '../selection-two/selection-two.component';

const Components: Array<any> = [
  SelectionComponent,
  SelectionTwoComponent,
  PreStepComponent,
];

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [
    CommonModule,
    Components,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './house.component.html',
  styleUrl: './house.component.scss',
  animations: [Animations],
})
export class HouseComponent {
  readonly #fb = inject(FormBuilder);
  readonly #dialogRef = inject(MatDialogRef<HouseComponent>);

  readonly #stepsIndexes: WritableSignal<number[]> = signal([1]);

  public readonly activeStepIndex: Signal<number> = computed(
    () => this.#stepsIndexes().at(-1)!
  );

  public readonly beforeActiveStep: Signal<number> = computed(
    () => this.#stepsIndexes().at(-2)! || 0
  );

  effect = effect(() => {});

  public readonly houseFormGroup: FormGroup<HouseFormGroup> =
    this.#fb.nonNullable.group({
      preStepFromGroup: { createType: '', projectName: '' },
      propertyPlace: '',
      propertyType: '',
    });

  public ngOnInit(): void {
    this.houseFormGroup?.valueChanges.pipe(tap(console.log)).subscribe();
  }

  public onNavigate = (stepIndex: number): void => {
    this.#stepsIndexes.update((arr) => [...arr, stepIndex]);
  };

  public cancelHandler = (res?: unknown): void =>
    this.#dialogRef.close(res ?? null);
}
