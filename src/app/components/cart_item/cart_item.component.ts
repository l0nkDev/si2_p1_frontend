import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'cart_item',
  templateUrl: './cart_item.component.html',
  imports: [FormsModule]
})
export class CartItemComponent {
  isEditable = 'disabled';
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  @Input({transform: numberAttribute}) id: number = 0;
  @Input({transform: numberAttribute}) productid: number = 0;
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() description: string = '';
  @Input() discount_type: string = '';
  @Input({transform: numberAttribute}) price: number = 0;
  @Input({transform: numberAttribute}) rating: number = 0;
  @Input({transform: numberAttribute}) discount: number = 0;
  @Input({transform: numberAttribute}) quantity: number = 0;
  @Output() entryDeletedEvent = new EventEmitter<string>()

  OnEntryButtonClick() {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.delete<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart/remove?id=" + this.id, {headers: this.headers})
      .subscribe(_ => {
        this.entryDeletedEvent.emit("")
        console.log("emitido")
      });
  }

  OnEditButtonClick() {
    if (this.isEditable === 'disabled') this.isEditable = '';
    else {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.patch<Response[]>("http://l0nk5erver.duckdns.org:5000/users/cart/add",
        {
          "id": this.id,
          "quantity": this.quantity
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
