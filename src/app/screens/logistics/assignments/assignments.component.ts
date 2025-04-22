import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Deliveries } from '../../../interfaces/deliveries';
import { AssignedDeliveryItemComponent } from '../../../components/assigned_delivery_item/assigned_delivery_item.component';


@Component({
  selector: 'assignments',
  templateUrl: './assignments.component.html',
  imports: [AssignedDeliveryItemComponent, FormsModule],
})

export class AssignmentsComponent implements OnInit{
  headers = new HttpHeaders();
  items: Deliveries[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.fetchContent()
  }

  fetchContent() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.get<Deliveries[]>("http://34.70.148.131:5000/admin/delivery/me", {headers: this.headers})
    .subscribe(response => {
      this.items = response;
    })
  }
}
