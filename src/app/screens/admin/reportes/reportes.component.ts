import { BitacoraItemComponent } from '../../../components/bitacora_item/bitacora_item.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Bitacora } from '../../../interfaces/bitacora';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  imports: [BitacoraItemComponent, FormsModule],
})

export class ReportesComponent implements OnInit{
  since = '';
  until = '';
  base = '';
  format = '';
  criteria = '';
  order = '';
  logs: Bitacora[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}

  fetchContent() {
  }

}


