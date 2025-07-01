import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule,],
  template: `
  <div class="container" style="font-size:40px">
  <span class="title" >Memory game</span>
  <span><button class="btn btn-primary">PLAY</button></span>
  </div>

  <div class="card">
  </div>
    
    <router-outlet />
  `,
  styles: `
    .container {
      display: flex;
      justify-content: space-between;
      max-width: 600px;
      margin: 0 auto;
      padding: 50px;
    }
  `,
})
export class App {
  protected title = 'angular-memory-game';
  products: Product[] = [
    {id: 1, name: '✔️'},
    {id: 2, name: '✖️'},
    {id: 3, name: '➗'},
    {id: 4, name: '➕'},
    {id: 5, name: '➖'},
    {id: 6, name: '🟰'},
  ]

}
type Product = {
    id: number;
    name: string;
}
