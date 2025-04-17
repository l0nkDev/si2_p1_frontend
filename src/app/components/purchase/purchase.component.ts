import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PurchaseItemComponent } from '../purchase_item/purchase_item.component';

export interface Response {
  id: number;
  total_paid: number;
  paid_on: string;
  payment_method: string;
  delivery_status: string;
  items: Item[];
}

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
  selector: 'purchase',
  templateUrl: './purchase.component.html',
    imports: [PurchaseItemComponent],
})

export class PurchaseComponent implements OnInit{
  buttonStatus = 'disabled'
  token: string | null = '';
  constructor(private _router: Router) { }
  headers = new HttpHeaders();
  @Input() response: Response | null = null

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
  }

}
