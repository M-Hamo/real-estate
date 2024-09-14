import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LanguageService } from './language.service';

describe('Service: LanguageService', () => {
  let langService!: LanguageService, translateService!: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        TranslateModule,
      ],
      providers: [],
    });

    translateService = TestBed.inject(TranslateService);
    langService = TestBed.inject(LanguageService);
  });

  it('should create a service', () => expect(LanguageService).toBeTruthy());

  it('should set language (EN) as default lang in first time', () => {
    localStorage.clear();

    expect(langService.lang()).toEqual('en');
  });

  it('should set the correct language', () => {
    localStorage.clear();

    langService.setLanguage('ar');

    expect(langService.lang()).toEqual('ar');
    expect(localStorage.getItem('lang')).toEqual('ar');
    localStorage.clear();
  });

  it('should change <html/> tag directions and language attributes', () => {
    localStorage.clear();

    const html: HTMLHtmlElement = document.getElementsByTagName('html')[0];

    expect(html.getAttribute('lang')).toEqual('en');
    expect(html.getAttribute('dir')).toEqual('ltr');

    langService.setLanguage('ar');

    expect(html.getAttribute('lang')).toEqual('ar');
    expect(html.getAttribute('dir')).toEqual('rtl');
    expect(html.getAttribute('dir')).toEqual('rtl');
    localStorage.clear();
  });

  it('should use the correct and selected language in translation', () => {
    localStorage.clear();

    langService.setLanguage('ar');

    expect(translateService.currentLang).toEqual('ar');

    localStorage.clear();
  });
});
