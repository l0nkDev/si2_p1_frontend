import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

export interface Response {
  access_token: string
}

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  imports: [FormsModule],
})
export class LogoutComponent implements OnInit{
  constructor(private _router: Router) { }
  ngOnInit(): void {
    sessionStorage.clear();
    this._router.navigateByUrl('/')
    window.location.href = '/'; 
  }
}
