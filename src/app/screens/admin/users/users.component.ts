import { UsersItemComponent } from '../../../components/users_item/users_item.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';

export interface Response {
  id: number;
  name: string;
  lname: string;
  email: string;
  role: string;
  country: string;
  state: string;
  address: string;
  password: string;
  isEditable: string;
}

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  imports: [UsersItemComponent],
})

export class UsersComponent implements OnInit{
  users: Response[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Response[]>("http://34.70.148.131:5000/admin/users", {headers: this.headers})
    .subscribe(response => {
      this.users = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response[]>("http://34.70.148.131:5000/admin/users/add",
      {
        "name": "Nuevo",
        "lname": "usuario",
        "email": "example@placeholder.com",
        "role": "guest",
        "country": "",
        "state": "",
        "address": "",
        "password": "123"
      }
      ,{headers: this.headers})
    .subscribe(_ => {
      this.fetchContent();
    });
  }

}


