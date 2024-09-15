import { CommonModule } from '@angular/common';
import {
  Component,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Animations } from '@shared';
import { timer } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.scss',
  animations: [Animations],
})
export class SubmitComponent {
  public onNext: OutputEmitterRef<void> = output();

  public readonly progress: WritableSignal<number> = signal(0);

  public ngOnInit(): void {
    this._startProgress();
  }

  private _startProgress = (): void => {
    const totalDuration = 5000;
    const tickInterval = 50;
    const totalTicks = totalDuration / tickInterval;

    timer(0, tickInterval)
      .pipe(
        map((tick: number) => (tick / totalTicks) * 100),
        tap((val: number) => this.progress.set(Math.min(val, 100))),
        takeUntil(timer(totalDuration))
      )
      .subscribe({ complete: () => this.onNext.emit() });
  };
}
