import { Component, Input, numberAttribute } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'inventory_item',
  templateUrl: './inventory_item.component.html',
})
export class InventoryItemComponent {
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Input({transform: numberAttribute}) id: number = 0;
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() description: string = '';
  @Input() discount_type: string = '';
  @Input({transform: numberAttribute}) discount: number = 0;
  @Input({transform: numberAttribute}) price: number = 0;
  @Input({transform: numberAttribute}) stock: number = 0;

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));
}
