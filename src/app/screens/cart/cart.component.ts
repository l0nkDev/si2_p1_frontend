import { ProductComponent } from '../../components/product/product.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';

export interface Response {
  id: number;
  cartid: number;
  productid: number;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount: string;
  discount_type: string;
  price: number;
}

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  imports: [ProductComponent],
})

export class CartComponent implements OnInit{
  entries: Response[] = [];
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  
  ngOnInit() {
    this.headers = this.headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart", {headers: this.headers})
    .subscribe(response => {
      this.entries = response;
      console.log(this.entries)
    })
  }
}
