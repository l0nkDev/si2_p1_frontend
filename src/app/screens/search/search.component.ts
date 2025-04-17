import { ProductComponent } from '../../components/product/product.component';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface Response {
  id: number;
  name: string;
  brand: string;
  description: string;
  discount_type: string;
  price: number;
  discount: number;
}

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  imports: [ProductComponent, FormsModule],
})

export class SearchComponent implements OnInit{
  query = '';
  @Input() set q(query: string) {this.query = query}
  
  constructor(private route: ActivatedRoute, private _router: Router) {}
  products: Response[] = [];

  private http = new HttpClient(new HttpXhrBackend({
    build: () => new XMLHttpRequest()
  }));

  ngOnInit() {
    this.fetchContents()
  }

  OnSearch() {
    this._router.navigateByUrl('/search?q=' + this.query);
    this.fetchContents()
  }

  fetchContents() {    
    this.http.get<Response[]>("http://l0nk5erver.duckdns.org:5000/products/search?q=" + this.query)
    .subscribe(response => {
      this.products = response;
      console.log(this.products)
    })
  }

  getPrerenderParams() {}
}
