import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  imports: [FormsModule],
})
export class InfoComponent implements OnInit{
  isEditable = 'disabled'
  headers = new HttpHeaders()
  user: User | null = null
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.get<User>("http://l0nk5erver.duckdns.org:5000/users/self", {headers: this.headers})
    .subscribe(_ => { this.user = _ ; console.log(this.user)});
  }

  register() {
  }
}
