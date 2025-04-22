import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Deliveries } from '../../interfaces/deliveries';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'delivery_item',
  templateUrl: './delivery_item.component.html',
})

export class DeliveryItemComponent {
  @Output() deliveryTaken = new EventEmitter<string>()
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  @Input() response: Deliveries | null = null

  OnButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.patch("http://34.70.148.131:5000/admin/delivery",
      {
        "id": this.response?.id
      }, {headers: this.headers})
    .subscribe(_ => {this.deliveryTaken.emit(""); console.log("emitido")})
  }

  date(str: string) {
    return formatDate(Date.parse(str), 'dd-MM-yyyy - hh:mm:ss', 'en-US');
  }
}
