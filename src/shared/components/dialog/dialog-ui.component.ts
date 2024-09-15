import { Direction } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import {
  Component,
  InputSignal,
  OutputEmitterRef,
  Signal,
  inject,
  input,
  output,
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { BidirectionallyService } from 'src/services/bidirectionally.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  selector: 'app-dialog',
  templateUrl: './dialog-ui.component.html',
  styleUrls: ['./dialog-ui.component.scss'],
})
export class DialogComponent {
  readonly #bidiService = inject(BidirectionallyService);

  public readonly progressValue: InputSignal<number> = input.required({
    alias: 'progress',
    transform: (val: number) => (val / 4) * 100,
  });

  public onClose: OutputEmitterRef<void> = output();

  public readonly dir: Signal<Direction> = this.#bidiService.direction;
}
