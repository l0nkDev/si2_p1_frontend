import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OnSameUrlNavigation } from '@angular/router';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private _router: Router) { }
  loginText = '';
  loginDestination = '';
  token: string | null = '';
  navlink1Status = '';
  navlink2Status = '';
  navlink3Status = '';
  navlink3Enabled = 'disabled';

  onRouteUpdate() {
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
    this.navlink1Status = this._router.url === '/login' ? 'active' : '';
    this.navlink2Status = this._router.url === '/' ? 'active' : '';
    this.navlink3Status = this._router.url === '/cart' ? 'active' : '';
  }

  ngOnInit() {
    this.onRouteUpdate()
    this._router.events.subscribe(val => {this.onRouteUpdate()})
  }

}
