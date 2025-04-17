import { ProductComponent } from '../../components/product/product.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  imports: [ProductComponent, FormsModule],
})

export class CatalogComponent implements OnInit{
  constructor(private _router: Router) { }
  query = '';
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

  OnSearch() {
    console.log("searching")
    this._router.navigateByUrl('/search?q=' + this.query);
  }

}
