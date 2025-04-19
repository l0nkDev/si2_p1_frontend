import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PurchaseItemComponent } from '../purchase_item/purchase_item.component';
import { Purchase } from '../../interfaces/purchase';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
    imports: [FormsModule, PurchaseItemComponent],
})

export class PurchaseComponent implements OnInit{
  rating = 5;
  buttonStatus = 'disabled'
  token: string | null = '';
  constructor(private _router: Router) { }
  headers = new HttpHeaders();
  @Input() response: Purchase | null = null

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
  }

  OnRateClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/users/purchases/rate",
      {
        "id": this.response?.id,
        'rating': this.rating
      }
      , {headers: this.headers})
    .subscribe(_ => {
      alert('Rating enviado.');
    })
  }
    
  date(str: string) {
    return formatDate(Date.parse(str), 'dd-MM-yyyy - hh:mm:ss', 'en-US');
  }
}
