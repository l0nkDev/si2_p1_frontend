import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpXhrBackend, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'inventory_item',
  templateUrl: './inventory_item.component.html',
  imports: [FormsModule]
})
export class InventoryItemComponent {
  files: any[] = [];
  @Input() product: Product | null = null
  isEditable = 'disabled';
  buttonStatus = 'disabled'
  token: string | null = '';
  headers = new HttpHeaders();
  @Output() entryDeletedEvent = new EventEmitter<string>()

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  OnEntryButtonClick() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.delete<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/product/remove?id=" + this.product?.id, {headers: this.headers})
    .subscribe(_ => {
      this.entryDeletedEvent.emit("")
      console.log("emitido")
    });
}

  OnEditButtonClick() {
    if (this.isEditable === 'disabled') this.isEditable = '';
    else {
      this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      this.http.patch("http://l0nk5erver.duckdns.org:5000/admin/product/add",
        {
          "id": this.product?.id,
          "name": this.product?.name,
          "brand": this.product?.brand,
          "description": this.product?.description,
          "price": this.product?.price,
          "discount": this.product?.discount,
          "discount_type": this.product?.discount_type,
          "stock": this.product?.stock,
        }
        ,{headers: this.headers})
      .subscribe(_ => {
        this.isEditable = 'disabled'
        this.entryDeletedEvent.emit("")
        console.log("emitido")
      });
    }
  }

  OnFileChange(event: any) {
    this.files = event.srcElement.files
    console.log("archivo")
    console.log(this.files[0]) 
  }
  
  OnImageButtonClick() { 
    console.log("boton")
    let formData = new FormData();
    formData.append("file", this.files[0], this.files[0].name);
    console.log(formData)
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post("http://l0nk5erver.duckdns.org:5000/products/img?id="+this.product?.id, formData, {headers: this.headers}).subscribe(
      (r)=>{
        this.entryDeletedEvent.emit("")
        alert("imagen subida")
      }
    )
  }
}
