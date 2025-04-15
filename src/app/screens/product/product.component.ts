import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';

export interface Response {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
}

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit{

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/products/get")
    .subscribe(response => {
    })
  }
}
