import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SummaryItem } from '../+models/summary-item.model';
import { ISearchable } from '../+models/searchable.model';

@Component({
  selector: 'summary-items-preview',
  templateUrl: './summary-items.component.html',
  styleUrls: [ './summary-items.component.scss' ]
})
export class SummaryItemsComponent  {
  @Input() item: SummaryItem;
  @Input() selectedModel: ISearchable;
  @Input() showEditControls: boolean = false;
  @Output() changeItemOrder: EventEmitter<any> = new EventEmitter();


  triggerChangeItemOrder(action, item){
    this.changeItemOrder.emit({action: action, item: item})
  }
}
