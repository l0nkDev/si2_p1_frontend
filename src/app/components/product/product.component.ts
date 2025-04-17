import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { provideCloudinaryLoader } from '@angular/common';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})

export class ProductComponent implements OnInit{
  @Input() product: Product | null = null
  buttonStatus = 'disabled'
  token: string | null = '';
  constructor(private _router: Router) { }
  headers = new HttpHeaders();

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) { this.buttonStatus = ''}
    else {this.buttonStatus = 'disabled'}
  }

  OnButtonClick() {
        this._router.navigateByUrl('/product?p='+ this.product?.id)
  }

  OnCartButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/users/cart/add",
      {
        "id": this.product?.id
      }
      , {headers: this.headers})
    .subscribe(_ => {
      alert('"' + this.product?.name + '" ha sido agregado al carrito.');
    })
}
}
