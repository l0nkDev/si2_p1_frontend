import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpXhrBackend} from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

export interface Response {
  access_token: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {
  constructor(private _router: Router) { }

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  email = '';
  password = '';
  message = '';


  login() {
    var email = this.email;
    var password = this.password;
    this.http.post<Response>(
      "http://l0nk5erver.duckdns.org:5000/auth/login/email",
      {
        "email": email,
        "password": password
      }
    ).subscribe(response => {
      sessionStorage.setItem('token', response.access_token); 
      console.log('router reached');
      this._router.navigateByUrl('/');
    }
  );
  }
}
