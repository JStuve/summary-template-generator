import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SummaryItem, Section } from './+models/summary-item.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  
  summaryItems: Section[] = [];
  selectedModel;

  constructor(
    private translateService: TranslateService
  ) {
    translateService.addLangs(['en', 'de']);
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  triggerUpdateFormSummary(summaryItem) {
    this.summaryItems = [{type: 'section', items: [summaryItem]}];
  }

  triggerUpdateSelectedModel(model) {
      this.selectedModel = model
  }
}
