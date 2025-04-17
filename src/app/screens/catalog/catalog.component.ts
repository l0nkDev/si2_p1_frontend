import { ProductComponent } from '../../components/product/product.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';

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
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  imports: [ProductComponent, FormsModule, RouterLink],
})

export class CatalogComponent implements OnInit{
  products: Product[] = [];
  constructor(private _router: Router) { }
  query = '';

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.http.get<Product[]>("http://l0nk5erver.duckdns.org:5000/products")
    .subscribe(_ => {
      this.products = _;
      console.log(this.products)
    })
  }

  OnSearch() {
    console.log("searching")
    this._router.navigateByUrl('/search?q=' + this.query);
  }

}
