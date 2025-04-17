import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit{
  token: string | null = '';
  buttonStatus = 'disabled'
  headers = new HttpHeaders();
  id = 0;
  @Input() set p(query: number) {this.id = query}
  name = '';
  brand = '';
  description = '';
  discount_type = '';
  price = 0;
  discount = 0;

  constructor(private route: ActivatedRoute, private _router: Router) {}

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) { this.buttonStatus = ''}
    else {this.buttonStatus = 'disabled'}

    this.http.get<Response>("http://l0nk5erver.duckdns.org:5000/products/get?id=" + this.id)
    .subscribe(response => {
      this.name = response.name;
      this.brand = response.brand;
      this.description = response.description;
      this.discount = response.discount;
      this.price = response.price;
      this.discount_type = response.discount_type;
    })
  }

  OnCartButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart/add",
      {
        "id": this.id
      }
      , {headers: this.headers})
    .subscribe(_ => {
      alert('"' + this.name + '" ha sido agregado al carrito.');
    })
}
}
