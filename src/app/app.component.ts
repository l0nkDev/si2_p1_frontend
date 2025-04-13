import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { CatalogComponent } from './screens/catalog/catalog.component';
import { LoginComponent } from "./screens/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CatalogComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(ngbConfig: NgbConfig) {
    ngbConfig.animation = true;
  }
}
