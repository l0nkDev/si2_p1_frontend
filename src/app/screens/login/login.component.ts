import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpHandler, HttpXhrBackend} from '@angular/common/http';

export interface Response {
  access_token: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  email = '';
  password = '';
  token = '';

  login() {
    var email = this.email;
    var password = this.password;
    this.token = "";
    this.http.post<Response>(
      "http://l0nk5erver.duckdns.org:5000/auth/login/email",
      {
        "email": email,
        "password": password
      }
    ).subscribe(response => {this.token = response.access_token});
  }
}
