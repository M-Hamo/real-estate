import { Direction } from '@angular/cdk/bidi';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BidirectionallyService } from './bidirectionally.service';
import { ILanguageVm, Languages } from '@shared/utils/interfaces';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public constructor(
    private readonly _translate: TranslateService,
    private readonly _bidirectionallyService: BidirectionallyService
  ) {
    this.lang() ?? localStorage.setItem('lang', 'en');
    this.setLanguage(JSON.parse(JSON.stringify(localStorage.getItem('lang'))));
  }

  private readonly _languages: string[] = Languages.map(
    (lang: ILanguageVm) => lang.id
  );

  public lang: WritableSignal<string | null> = signal(
    localStorage.getItem('lang')
  );

  public setLanguage = (lang: string | null): void => {
    this.lang.set(lang);

    const dir: Direction = lang !== 'ar' ? 'ltr' : 'rtl';

    this._bidirectionallyService.setDirection(dir);

    document.getElementsByTagName('html')[0].setAttribute('dir', dir);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('lang', lang || this._languages[0]);

    this._translate.use(lang || this._languages[0]);

    localStorage.setItem('lang', lang || this._languages[0]);
  };
}
