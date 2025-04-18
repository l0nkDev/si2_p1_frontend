import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Deliveries } from '../../../interfaces/deliveries';
import { DeliveryItemComponent } from '../../../components/delivery_item/delivery_item.component';


@Component({
  selector: 'delivery_list',
  templateUrl: './delivery_list.component.html',
  imports: [DeliveryItemComponent, FormsModule],
})

export class DeliveryListComponent implements OnInit{
  headers = new HttpHeaders();
  items: Deliveries[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.fetchContent()
  }

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Deliveries[]>("http://l0nk5erver.duckdns.org:5000/admin/delivery", {headers: this.headers})
    .subscribe(response => {
      this.items = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}
}
