import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'inventory_item',
  templateUrl: './inventory_item.component.html',
  imports: [FormsModule]
})
export class InventoryItemComponent {
  @Input() isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() description: string = '';
  @Input() discount_type: string = '';
  @Input({transform: numberAttribute}) discount: number = 0;
  @Input({transform: numberAttribute}) price: number = 0;
  @Input({transform: numberAttribute}) stock: number = 0;
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/product/remove?id=" + this.id, {headers: this.headers})
    .subscribe(_ => {
      this.entryDeletedEvent.emit("")
      console.log("emitido")
    });
}

  OnEditButtonClick() {
    if (this.isEditable === 'disabled') this.isEditable = '';
    else {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.patch<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/product/add",
        {
          "id": this.id,
          "name": this.name,
          "brand": this.brand,
          "description": this.description,
          "price": this.price,
          "discount": this.discount,
          "discount_type": this.discount_type,
          "stock": this.stock,
        }
        ,{headers: this.headers})
      .subscribe(_ => {
        this.isEditable = 'disabled'
        this.entryDeletedEvent.emit("")
        console.log("emitido")
      });
    }
  }
}
