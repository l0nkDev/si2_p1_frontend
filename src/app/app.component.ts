import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { response } from 'express';

export interface Response {
  id: number;
  role: string;
  email: string;
  name: string;
  lname: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  headers = new HttpHeaders();
  constructor(private _router: Router) { }
  id = 0;
  role = '';
  name = '';
  lname = '';
  email = '';
  loginText = '';
  loginDestination = '';
  token: string | null = '';
  navlink1Status = '';
  navlink2Status = '';
  navlink3Status = '';
  navlink4Status = '';
  navlink5Status = '';
  navlink3Enabled = '';

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  onRouteUpdate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Response>("http://l0nk5erver.duckdns.org:5000/users/self", {headers: this.headers})
    .subscribe(response => {
      this.role = response.role;
      this.email = response.email;
      this.id = response.id;
      this.name = response.name;
      this.lname = response.lname;
      console.log(this.role)
    })
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.loginText = 'Cerrar Sesion';
      this.loginDestination = 'logout';
      this.navlink3Enabled = '';
    } else {
      this.loginText = 'Iniciar Sesion';
      this.loginDestination = 'login';
      this.navlink3Enabled = 'disabled';
    }
    this.navlink2Status = this._router.url === '/' || this._router.url.startsWith('/product') ? 'active' : '';
    this.navlink1Status = this._router.url.startsWith('/login') ? 'active' : '';
    this.navlink3Status = this._router.url.startsWith('/cart') ? 'active' : '';
    this.navlink4Status = this._router.url.startsWith('/purchases') ? 'active' : '';
    this.navlink5Status = this._router.url.startsWith('/admin') ? 'active' : '';
  }

  ngOnInit() {
    this.onRouteUpdate()
    this._router.events.subscribe(val => {this.onRouteUpdate()})
  }

}
