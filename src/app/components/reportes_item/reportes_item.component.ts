import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Reporte } from '../../interfaces/reporte';
import { formatDate } from '@angular/common';

@Component({
  selector: 'reporte_item',
  templateUrl: './reportes_item.component.html',
  imports: [FormsModule]
})

export class ReportesItemComponent {
  files: any[] = [];
  @Input() reporte: Reporte | null = null

  date(str: string) {
    return formatDate(Date.parse(str), 'dd-MM-yyyy - hh:mm:ss', 'en-US');
  }
}
