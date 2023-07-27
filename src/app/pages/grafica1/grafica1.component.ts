import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 'Download Sales', 'In-Store Sales','Mail-Order Sales' ];
  public data1: number[] = [10, 15, 40];
  
  public labels2: string[] = [ 'Coca', 'Fernet','Pizza' ];
  public data2: number[] = [10, 5, 40];
 
}
