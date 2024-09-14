import {
  Component,
  DestroyRef,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { LanguageService } from 'src/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from './services';
import { HouseComponent } from './components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, JsonPipe],
  template: `<div
    class="w-full h-screen flex justify-center items-center text-2xl"
  >
    {{ houseDetails() | json }}
  </div>`,
})
export class AppComponent implements OnInit {
  public constructor(
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _languageService: LanguageService,
    private readonly _modalService: ModalService,
    private readonly _destroyRef: DestroyRef
  ) {
    // Change material icons theme
    this._iconRegistry.setDefaultFontSetClass('material-icons-round');
  }

  public readonly houseDetails: WritableSignal<unknown> = signal(null);

  public ngOnInit(): void {
    this._openHouseModal();
  }

  private _openHouseModal = (): void => {
    this._modalService
      .openModal(HouseComponent)
      .pipe(
        tap((res) => this.houseDetails.set(res)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  };
}
