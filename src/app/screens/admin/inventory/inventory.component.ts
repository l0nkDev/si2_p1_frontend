import { InventoryItemComponent } from '../../../components/inventory_item/inventory_item.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXhrBackend } from '@angular/common/http';
import { Product } from '../../../interfaces/product';


@Component({
  selector: 'inventory',
  templateUrl: './Inventory.component.html',
  imports: [InventoryItemComponent],
})

export class InventoryComponent implements OnInit{
  page = 0;
  products: Product[] = [];
  headers = new HttpHeaders;
  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {this.fetchContent()}
  
  @HostListener('window:scroll', ['$event'])
    onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {    
      this.page++;
      this.http.get<Product[]>("http://l0nk5erver.duckdns.org:5000/products?page=" + this.page)
        .subscribe(_ => {
          this.products = this.products.concat(_)
          console.log(this.products)
        }
      )
    }
  }
  
  fetchContent() {
    this.http.get<Product[]>("http://l0nk5erver.duckdns.org:5000/products")
    .subscribe(response => {
      this.products = response;
    })
  }

  OnChildButtonClick() { console.log("recibido"); this.fetchContent()}

  CreateNewEntry() {
    this.headers = this.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
    this.http.post<Response[]>("http://l0nk5erver.duckdns.org:5000/admin/product/add",
      {
        "name": "Nuevo producto",
        "brand": "_",
        "description": "",
        "price": 0,
        "discount": 0,
        "discount_type": "P",
        "stock": 0,
      }
      ,{headers: this.headers})
    .subscribe(_ => {
      this.fetchContent();
    });
  }

}


