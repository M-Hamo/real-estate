import { Direction, Directionality } from '@angular/cdk/bidi';
import { Injectable, Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class BidirectionallyService {
  private readonly _dir: Directionality = inject(Directionality);

  private readonly dir: Signal<Direction> = toSignal(this._dir.change, {
    initialValue: 'ltr',
  });

  public readonly direction: Signal<Direction> = computed(
    () => this.dir() || 'ltr'
  );

  public isRtl: Signal<boolean> = computed(() => this.direction() === 'rtl');

  /**
   *
   * @param dir Dom Direction (ltr Or rtl)
   * @param onInit to specify which case we are => when init app OR just change it manually For showing loader
   */
  public setDirection(dir: Direction, onInit = true): void {
    if (onInit) this._dir.change.emit(dir);
    else {
      //TODO: Show splash screen here
      setTimeout(() => {
        this._dir.change.emit(dir);
        //TODO: Hide splash screen here
      }, 1000);
    }
  }
}
