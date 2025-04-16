import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit{
  buttonStatus = 'disabled'
  token: string | null = '';
  constructor(private _router: Router) { }
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() description: string = '';
  @Input({transform: numberAttribute}) price: number = 0;

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) { this.buttonStatus = ''}
    else {this.buttonStatus = 'disabled'}
  }

  OnButtonClick() {
        this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
        this.http.post<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart/add",
          {
            "id": this.id
          }
          , {headers: this.headers})
        .subscribe(_ => {
          this._router.navigateByUrl('/cart');
        })
  }
}
