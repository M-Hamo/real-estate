import { Component, input, InputSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StarTitle } from '@shared';

@Component({
  selector: 'star-title',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './star-title.component.html',
})
export class StarTitleComponent {
  public readonly starTitle: InputSignal<StarTitle> = input.required();
}
