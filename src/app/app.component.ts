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
  
  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      this.loginText = 'Cerrar Sesion';
      this.loginDestination = 'logout';
    } else {
      this.loginText = 'Iniciar Sesion';
      this.loginDestination = 'login';
    }
  }
}
