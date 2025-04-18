import { Component, Input } from '@angular/core';
import { PurchaseItem } from '../../interfaces/purchase_item';

@Component({
  selector: 'purchase_item',
  templateUrl: './purchase_item.component.html',
})

export class PurchaseItemComponent {
  @Input() response: PurchaseItem | null = null
}
