import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
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
  headers = new HttpHeaders();
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
  constructor(private _router: Router) { }
  ngOnInit(): void {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/auth/logout",{}, {headers: this.headers})
    .subscribe((_: any) => {
      sessionStorage.clear();
      this._router.navigateByUrl('/');
      window.location.href = '/'; 
     })
  } 


}
