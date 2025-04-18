import { ProductComponent } from '../../../components/product/product.component';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  imports: [ProductComponent, FormsModule, RouterLink],
})

export class SearchComponent implements OnInit{
  products: Product[] = [];
  query = '';
  @Input() set q(query: string) {this.query = query}

  constructor(private route: ActivatedRoute, private _router: Router) {}

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
    this.http.get<Product[]>("http://l0nk5erver.duckdns.org:5000/products/search?q=" + this.query)
    .subscribe(_ => {
      this.products = _;
      console.log(this.products)
    })
  }

  getPrerenderParams() {}
}
