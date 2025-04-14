import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentRoute: string = "";
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentRoute = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
  }
}
