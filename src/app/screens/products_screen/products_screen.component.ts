import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductListing } from '../../interfaces/product_listing';
import { ProductComponent } from '../../components/product/product.component';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'productscreen',
  templateUrl: './products_screen.component.html',
  imports: [ProductComponent],
})
export class ProductsScreenComponent implements OnInit{
  console = console;
  token: string | null = '';
  buttonStatus = 'disabled'
  headers = new HttpHeaders();
  id = 0;
  @Input() set p(query: number) {this.id = query}
  listing: ProductListing | null = null

  constructor(private route: ActivatedRoute, private _router: Router) {}

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) { this.buttonStatus = ''}
    else {this.buttonStatus = 'disabled'}

    this.http.get<ProductListing>("http://l0nk5erver.duckdns.org:5000/products/get?id=" + this.id)
    .subscribe(_ => {
      this.listing = _
      console.log(this.listing)
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
      alert('"' + this.listing?.name + '" ha sido agregado al carrito.');
    })
}
}
