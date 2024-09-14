import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'submit-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  templateUrl: './submit-btn.component.html',
})
export class SubmitBtnComponent {
  public readonly disabled: InputSignal<boolean> = input(false);
  public readonly text: InputSignal<string> = input('');
  public readonly icon: InputSignal<string> = input('');
}
