import { Component, Input, Output, numberAttribute, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'users_item',
  templateUrl: './users_item.component.html',
  imports: [FormsModule]
})
export class UsersItemComponent {
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() email: string = '';
  @Input() name: string = '';
  @Input() lname: string = '';
  @Input() role: string = '';
  @Input() country: string = '';
  @Input() state: string = '';
  @Input() address: string = '';
  @Input() password: string = '';
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/users/remove?id=" + this.id, {headers: this.headers})
    .subscribe(_ => {
      this.entryDeletedEvent.emit("")
      console.log("emitido")
    });
}

  OnEditButtonClick() {
    console.log(this.isEditable)
    if (this.isEditable === 'disabled') this.isEditable = '';
    else {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.patch<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/users/add",
        {
          "id": this.id,
          "name": this.name,
          "lname": this.lname,
          "email": this.email,
          "role": this.role,
          "country": this.country,
          "address": this.address,
          "state": this.state,
          "password": this.password,
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
