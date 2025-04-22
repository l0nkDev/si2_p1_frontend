import { PurchaseComponent } from '../../../components/purchase/purchase.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Purchase } from '../../../interfaces/purchase';


@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  imports: [PurchaseComponent, FormsModule],
})

export class PurchasesComponent implements OnInit{
  headers = new HttpHeaders();
  items: Purchase[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.fetchContent()
  }

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Purchase[]>("http://34.70.148.131:5000/users/purchases", {headers: this.headers})
    .subscribe(response => {
      this.items = response;
      console.log(response)
    })
  }
}
