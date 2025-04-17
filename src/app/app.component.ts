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
  loginStatus = '';
  homeStatus = '';
  meStatus = '';
  adminStatus = '';
  meEnabled = '';

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
      this.meEnabled = '';
    } else {
      this.loginText = 'Iniciar Sesion';
      this.loginDestination = 'login';
      this.meEnabled = 'disabled';
    }
    this.homeStatus = this._router.url === '/' || this._router.url.startsWith('/product') || this._router.url.startsWith('/cart') || this._router.url.startsWith('/search')? 'active' : '';
    this.loginStatus = this._router.url.startsWith('/login') || this._router.url.startsWith('/register') ? 'active' : '';
    this.meStatus = this._router.url.startsWith('/me') ? 'active' : '';
    this.adminStatus = this._router.url.startsWith('/admin') ? 'active' : '';
  }

  ngOnInit() {
    this.onRouteUpdate()
    this._router.events.subscribe(val => {this.onRouteUpdate()})
  }

}
