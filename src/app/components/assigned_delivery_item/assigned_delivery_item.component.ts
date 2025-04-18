import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Deliveries } from '../../interfaces/deliveries';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';

@Component({
  selector: 'assigned_delivery_item',
  templateUrl: './assigned_delivery_item.component.html',
})

export class AssignedDeliveryItemComponent {
  @Output() deliveryTaken = new EventEmitter<string>()
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  @Input() response: Deliveries | null = null

  OnButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.patch("http://l0nk5erver.duckdns.org:5000/admin/delivery/me",
      {
        "id": this.response?.id
      }, {headers: this.headers})
    .subscribe(_ => {if (this.response != null) this.response.delivery_status = 'Entregado'})
  }
}
