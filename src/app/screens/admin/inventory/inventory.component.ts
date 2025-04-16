import { InventoryItemComponent } from '../../../components/inventory_item/inventory_item.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

export interface Response {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount_type: string;
  price: number;
  discount: number;
}

@Component({
  selector: 'inventory',
  templateUrl: './Inventory.component.html',
  imports: [InventoryItemComponent],
})

export class InventoryComponent implements OnInit{
  products: Response[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/products")
    .subscribe(response => {
      this.products = response;
      console.log(this.products)
    })
  }
}
