import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  token: string | null = '';
  user: User | null = null;
  headers = new HttpHeaders();
  constructor(private _router: Router) { }
  loginText = '';
  loginDestination = '';
  loginStatus = '';
  logisticsStatus = '';
  homeStatus = '';
  meStatus = '';
  adminStatus = '';
  meEnabled = '';

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  onRouteUpdate() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<User>("http://l0nk5erver.duckdns.org:5000/users/self", {headers: this.headers})
    .subscribe(_ => {this.user = _})
    console.log(this.user)
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
    this.homeStatus = this._router.url === '/' || 
    this._router.url.startsWith('/product') || 
    this._router.url.startsWith('/cart') || 
    this._router.url.startsWith('/search')? 'active' : '';

    this.loginStatus = this._router.url.startsWith('/login') || 
    this._router.url.startsWith('/register') ? 'active' : '';

    this.meStatus = this._router.url.startsWith('/me') || 
    this._router.url.startsWith('/purchases') ? 'active' : '';

    this.adminStatus = this._router.url.startsWith('/inventory') || 
    this._router.url.startsWith('/logs') || 
    this._router.url.startsWith('/reports') || 
    this._router.url.startsWith('/users') ? 'active' : '';

    this.logisticsStatus = this._router.url.startsWith('/deliveries') || 
    this._router.url.startsWith('/assignments') ? 'active' : '';
  }

  ngOnInit() {
    this.onRouteUpdate()
    this._router.events.subscribe(val => {this.onRouteUpdate()})
  }

}
