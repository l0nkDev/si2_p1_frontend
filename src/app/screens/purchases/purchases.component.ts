import { PurchaseComponent } from '../../components/purchase/purchase.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  imports: [PurchaseComponent, FormsModule],
})

export class PurchasesComponent implements OnInit{
  headers = new HttpHeaders();
  items: Response[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.fetchContent()
  }

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/users/purchases", {headers: this.headers})
    .subscribe(response => {
      this.items = response;
      console.log(response)
    })
  }
}
