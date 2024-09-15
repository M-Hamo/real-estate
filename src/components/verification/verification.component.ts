import { Component, output, OutputEmitterRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Animations } from '@shared';

@Component({
  selector: 'verification',
  standalone: true,
  imports: [TranslateModule, MatIconModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
  animations: [Animations],
})
export class VerificationComponent {
  public onNext: OutputEmitterRef<void> = output();
}
