import { Component, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { SummaryItem } from '../+models/summary-item.model';
import { DataService } from '../+service/data.service';

@Component({
  selector: 'model-summary-preview',
  templateUrl: './model-summary-preview.component.html',
  styleUrls: [ './model-summary-preview.component.scss' ]
})
export class ModelSummaryPreviewComponent  {
  
  _summaryItems = []
  @Input() set summaryItems(items: SummaryItem[]) {
    if(this.clearPreview) {
      this._summaryItems = []
      this.clearPreview = false;
    }
    if(items){
      this._summaryItems = [...this._summaryItems, ...items];
    }
  }
  get summaryItems(){
    return this._summaryItems;
  }

  @Input() selectedModel;

  clearPreview = false

  constructor(
    private dataService: DataService
  ) {}

  loadSummaryTemplate(){
    this.clearPreview = true;
    this.dataService.getEliteSummaryTemplate(this.selectedModel.ModelType).pipe(take(1)).subscribe(
      (template) => {
        this.summaryItems = template.items 
        this.clearPreview = false
      })
  }

  triggerChangeItemOrder(event, sIndex, itemIndex){
    let startIndex = itemIndex;
    let finishIndex = itemIndex - 1;
    let sectionIndex = sIndex;
    let numberOfSections = this.summaryItems.length;
    let sectionLength = this.summaryItems[sectionIndex].length;

    switch(event.action){
      case 'DELETE':
        this.summaryItems[sectionIndex].items.splice(itemIndex,1);
        break;
      case 'UP':
        if(itemIndex === 0 && sectionIndex === 0){ 
          break;
        }else if(itemIndex == 0 && sectionIndex !== 0){ // If item is at top of the section them move it to the last position in the next section
          let newSectionIndex = sectionIndex - 1;
          this.moveItemToDifferentSection(this.summaryItems[sectionIndex].items, itemIndex, this.summaryItems[newSectionIndex].items, this.summaryItems[newSectionIndex].items.length)
        } else {
          this.moveItem(this.summaryItems[sectionIndex].items, itemIndex, itemIndex-1)
        }        
        break;
      case 'DOWN':
        if(itemIndex == this.summaryItems[sectionIndex].items.length - 1 && sectionIndex !== numberOfSections - 1){ // If item is at top of the section them move it to the last position in the next section
          let newSectionIndex = sectionIndex + 1;
          this.moveItemToDifferentSection(this.summaryItems[sectionIndex].items, itemIndex, this.summaryItems[newSectionIndex].items, 0)
        } else if (itemIndex !== this.summaryItems[sectionIndex].items.length -1){
          this.moveItem(this.summaryItems[sectionIndex].items, itemIndex, itemIndex+1)
        }  
        break;
    }
    console.log(event)
  }

  triggerChangeSectionOrder(event, sIndex) {
    switch(event){
      case 'DELETE':
        this.summaryItems.splice(sIndex,1);
        break;
      case 'ADD':
        this.summaryItems.splice(sIndex + 1, 0, { type: 'section', items: []});
        break;
      case 'UP':
        this.moveItem(this.summaryItems, sIndex, sIndex-1)
        break;
      case 'DOWN':
        this.moveItem(this.summaryItems, sIndex, sIndex+1)
        break; 
    }
    console.log(event)
  }

  saveSummartTemplate(){
    const c = JSON.stringify(this.summaryItems);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file,this.selectedModel.ModelType+".SummaryTemplate.json");
  }

  private moveItemToDifferentSection(dataOld, indexOld, dataNew, indexNew) {
    // Remove Item from old sectin
    let item = dataOld.splice(indexOld, 1)[0];

    // Index stored item into new section
    dataNew.splice(indexNew, 0, item);
    return dataNew;
  }

  private moveItem(data, indexStart, indexFin) {
    // remove `from` item and store it
    var f = data.splice(indexStart, 1)[0];
    // insert stored item into position `to`
    data.splice(indexFin, 0, f);
    return data
  }

  private download(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(blob, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
  }

  clearSummaryTemplate() {
    this.clearPreview = true;
    this.summaryItems = []
  }
}
