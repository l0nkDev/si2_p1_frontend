import { ReportesItemComponent } from '../../../components/reportes_item/reportes_item.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Reporte } from '../../../interfaces/reporte';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  imports: [ReportesItemComponent, FormsModule],
})

export class ReportesComponent implements OnInit{
  since = '';
  until = '';
  base = '';
  format = '';
  criteria = '';
  order = '';
  headers = new HttpHeaders;
  reportes: Reporte[] = [];
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
    this.http.get<Reporte[]>("http://l0nk5erver.duckdns.org:5000/reportes")
    .subscribe(response => {this.reportes = response})
  }

  onPdf() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/reportes/create",
      {
        "base": this.base,
        "criteria": this.criteria,
        "since": this.since,
        "until": this.until,
        "orden": this.order
      }
      , {headers: this.headers})
    .subscribe(response => {window.location.href = "http://l0nk5erver.duckdns.org:5000/reportes/" + this.base + "/" + this.criteria + "/" + this.order + "/" + this.since + "/" + this.until + "/pdf" })
  }

  onExcel() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/reportes/create",
      {
        "base": this.base,
        "criteria": this.criteria,
        "since": this.since,
        "until": this.until,
        "orden": this.order
      }
      , {headers: this.headers})
    .subscribe(response => {window.location.href = "http://l0nk5erver.duckdns.org:5000/reportes/" + this.base + "/" + this.criteria + "/" + this.order + "/" + this.since + "/" + this.until + "/excel" })
  }

}


