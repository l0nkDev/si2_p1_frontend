import { Component, Input } from '@angular/core';

export interface Item {
  id: number;
  productid: number;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  dprice: number;
  fprice: number;
}

@Component({
  selector: 'purchase_item',
  templateUrl: './purchase_item.component.html',
})

export class PurchaseItemComponent {
  @Input() response: Item | null = null
}
