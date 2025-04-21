import { ProductComponent } from '../../../components/product/product.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';

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
  page = 0;
  products: Product[] = [];
  constructor(private _router: Router) { }
  query = '';
  buttonStatus = 'disabled'
  token: string | null = '';

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  @HostListener('window:scroll', ['$event'])
    onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {    
      this.page++;
      this.http.get<Product[]>("http://l0nk5erver.duckdns.org:5000/products?page=" + this.page)
        .subscribe(_ => {
          this.products = this.products.concat(_)
          console.log(this.products)
        }
      )
    }
  }


  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) { this.buttonStatus = ''}
    else {this.buttonStatus = 'disabled'}
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
