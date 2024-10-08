import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
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
import { PropPreviewComponent } from '../prop-preview/prop-preview.component';
import { PropComponent } from '../prop/prop.component';
import { SubmitComponent } from '../submit/submit.component';
import { VerificationComponent } from '../verification/verification.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const Components: Array<any> = [
  SelectionComponent,
  SelectionTwoComponent,
  PreStepComponent,
  PropComponent,
  PropPreviewComponent,
  SubmitComponent,
  VerificationComponent,
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
  readonly #destroyRef = inject(DestroyRef);
  readonly #dialogRef = inject(MatDialogRef<HouseComponent>);

  readonly #stepsIndexes: WritableSignal<number[]> = signal([0]);

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
      propertyDetailsForm: { description: '', detailedDescription: '' },
      propertyDetailsType: '',
    });

  public ngOnInit(): void {
    this.houseFormGroup?.valueChanges
      .pipe(tap(console.log), takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  public onNavigate = (stepIndex: number): void => {
    this.#stepsIndexes.update((arr) => [...arr, stepIndex]);
  };

  public cancelHandler = (res?: unknown): void =>
    this.#dialogRef.close(res ?? null);
}
