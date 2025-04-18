import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

export interface Response {
  access_token: string
  id: number
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterLink],
})
export class RegisterComponent {
  constructor(private _router: Router) { }
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  email = '';
  password = '';
  name = '';
  lname = '';
  token = '';
  message = '';

  register() {
    var email = this.email;
    var password = this.password;
    var name = this.name;
    var lname = this.lname;
    this.token = "";

    this.http.post<Response>(
      "http://l0nk5erver.duckdns.org:5000/auth/register",
      {
        "email": email,
        "password": password,
        "name": name,
        "lname": lname
      }
    ).subscribe(response => {this.message = 'Registro exitoso'
      sessionStorage.clear()
      sessionStorage.setItem('token', response.access_token)
      this._router.navigateByUrl('/')
    });
  }
}
