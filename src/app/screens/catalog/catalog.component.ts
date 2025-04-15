import { ProductComponent } from '../../components/product/product.component';
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
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  imports: [ProductComponent],
})

export class CatalogComponent implements OnInit{
  products: Response[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/products")
    .subscribe(response => {
      this.products = response;
    })
  }
}
