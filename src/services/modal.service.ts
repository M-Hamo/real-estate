import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ModalHeight, ModalSize } from '@shared/utils/enum/modal-size-enum';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly #dialog = inject(MatDialog);
  readonly #translateService = inject(TranslateService);

  public openModal = (component: ComponentType<unknown>): Observable<any> => {
    return this.#dialog
      .open(component, {
        width: ModalSize.LARGE,
        height: ModalHeight.X_LARGE,
        disableClose: true,
        backdropClass: 'bg-[#40444C]',
        direction: this.#translateService.instant('dir'),
      })
      .afterClosed();
  };
}
