import { Component, Input } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() description: string = '';
  @Input() price: string = '';
}
