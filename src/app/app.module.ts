import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
'@fortawesome/angular-fontawesome';
import { faCoffee, faSort, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ModelSummaryEditComponent } from './model-summary-edit/model-summary-edit.component';
import { ModelSummaryPreviewComponent } from './model-summary-preview/model-summary-preview.component';

import { DataService } from './+service/data.service'
import { SummaryItemsComponent } from './summary-items/summary-items.component'

export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const MATERIAL_COMPONENTS = [
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule, MatTabsModule, MatListModule
]

library.add(faCoffee);

@NgModule({
  imports: [ BrowserModule, FormsModule, BrowserAnimationsModule, HttpClientModule, MATERIAL_COMPONENTS, FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [ 
    AppComponent,
    ModelSummaryEditComponent,
    ModelSummaryPreviewComponent,
    SummaryItemsComponent
  ],
  exports: [MATERIAL_COMPONENTS],
  bootstrap:    [ AppComponent ],
  providers: [DataService]
})
export class AppModule { }
