import { Component, Output, EventEmitter } from '@angular/core';

import { DataService } from '../+service/data.service';
import { SummaryItem } from '../+models/summary-item.model';
import { ISearchable } from '../+models/searchable.model';

export enum OptionType {
  MODEL = 'model',
  PROP = 'property',
  TYPE = 'type',
  FORMAT = 'format'
}

export interface KeyValue {
  key: string,
  value: any
}

@Component({
  selector: 'model-summary-edit',
  templateUrl: './model-summary-edit.component.html',
  styleUrls: [ './model-summary-edit.component.scss' ]
})
export class ModelSummaryEditComponent  {
  
  @Output() updateFormSummary: EventEmitter<any> = new EventEmitter()
  @Output() updateSelectModel: EventEmitter<any> = new EventEmitter();

  optionTypes = OptionType;

  summaryItem: SummaryItem = {
    type: '',
    label: '',
    format: '',
    properties: ['']
  };
  sProp = ['', '', '', '']
  selectedModel: ISearchable;
  selectedModelType: KeyValue;
  properties: KeyValue[] = [];
  modelTypes: KeyValue[] = []
  selectedType: KeyValue;
  sItemTypes: KeyValue[] = [
    { 
      key: "Header",
      value: "header"
    },
    { 
      key: "Label",
      value: "label"
    },
    { 
      key: "SectionHeader",
      value: "sectionHeader"
    },
    { 
      key: "Map",
      value: "map"
    },
    { 
      key: "Divider",
      value: "divider"
    },
    { 
      key: "Editable",
      value: "editable"
    },
    { 
      key: "Weblink",
      value: "weblink"
    },
    { 
      key: "Checkbox",
      value: "checkbox"
    },
    { 
      key: "Gallery",
      value: "gallery"
    }
  ]
  selectedFormat: KeyValue;
  formatType: KeyValue[] = [
    {
      key: "Currency",
      value: "currency"
    },
    {
      key: "Phone",
      value: "phone"
    },
    {
      key: "ShortDate",
      value: "shortDate"
    },
    {
      key: "DateTime",
      value: "dateTime"
    }
  ]

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getEliteData().subscribe(
      (data) => this.modelTypes = data)
  }

  editOptionChanged(data: any, type: OptionType, index: number = 0) {
    switch(type) {
      case OptionType.MODEL:
        this.selectedModel = (data as KeyValue).value;
        this.updateSelectModel.emit((data as KeyValue).value)
        this.updateProperties((data as KeyValue).value);
        break;
      case OptionType.TYPE:
        this.summaryItem.type = (data as KeyValue).value;
        break;
      case OptionType.PROP:
        this.summaryItem.properties[index] = data.value.key;
        break;
      case OptionType.FORMAT:
        this.summaryItem.format = (data as KeyValue).value;
        break;
    }
  }

  updateProperties(modelProperties: object) {
    let modelObject: object = modelProperties
    let newProperties: KeyValue[] = []
    
    
    Object.entries(modelObject).forEach(
      ([k, v]) => {
        newProperties.push({key: k, value: v})
      })

    this.summaryItem.properties = []
    this.properties = newProperties;
    this.addNewProperty();
  }

  addNewProperty(){
    this.summaryItem.properties.push("")
  }

  removeNewProperty(){
    this.summaryItem.properties.splice(-1,1)
  }

  triggerUpdateFormSummary(){
    this.updateFormSummary.emit(this.summaryItem);
    this.summaryItem = {
      type: this.summaryItem.type,
      label: '',
      format: '',
      properties: ['']
    };
    this.selectedType = null;
  }

  resetEditSummary(){
    this.summaryItem = {
      type: this.summaryItem.type,
      label: '',
      format: '',
      properties: ['']
    };
    this.selectedFormat = null;
    this.selectedType = null;
    this.sProp = ['', '', '', '']
  }
}
