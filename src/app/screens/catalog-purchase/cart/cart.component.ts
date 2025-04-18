import { CartItemComponent } from '../../../components/cart_item/cart_item.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { User } from '../../../interfaces/user';

export interface Response {
  id: number;
  cartid: number;
  productid: number;
  quantity: number;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount: number;
  discount_type: string;
  rating: number;
  price: number;
}

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  imports: [CartItemComponent],
})

export class CartComponent implements OnInit{
  vip: string = '';
  total = 0;
  entries: Response[] = [];
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));


  ngOnInit() {
    this.fetchContent()
  }

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<User>("http://l0nk5erver.duckdns.org:5000/users/self", {headers: this.headers}).subscribe(_ => {this.vip = _.vip;})
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart", {headers: this.headers})
    .subscribe(response => {
      this.entries = response;
      console.log(response)
      this.total = 0;
      for (var entry of this.entries) {
        let finalprice = entry.product.discount_type === 'P' ? (entry.product.price * (100 - entry.product.discount)) / 100 : entry.product.price - entry.product.discount;
        this.total = this.total + (finalprice * entry.quantity);
      }
    })
  }

  OnButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart", {headers: this.headers})
    .subscribe(response => {this.fetchContent()})
  }

  OnCheckoutClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart/checkout", null, {headers: this.headers})
    .subscribe(response => {this.fetchContent()})
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}
}
