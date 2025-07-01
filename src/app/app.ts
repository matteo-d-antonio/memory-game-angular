import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule,],
  template: `
  <div>
    <div class="container" style="font-size:40px">
      <span class="title" >Memory game</span>
      <span><button class="btn btn-outline-danger" (click)="shuffleCards()">RESET</button></span>
    </div>

    <div class="card-container">
      <li *ngFor="let card of cards()" class="ms-card-item">
        {{ card.name }}
      </li>
    </div>
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
    .ms-card-item {
      display: inline-block;
      width: 100px;
      height: 100px;
      background-color:rgba(255, 255, 255, 0.1);
      border: 1px solid #ccc;
      border-radius: 8px;
      text-align: center;
      line-height: 100px;
      margin: 10px;
      font-size: 2em;
      cursor: pointer;
      color: white;
    }
    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 500px;
      margin: 0 auto;
    } 
      
}
  `,
})
export class App {
  protected title = 'angular-memory-game';
  products: Product[] = [
    {id: 1, name: '🐷'},
    {id: 2, name: '🐮'},
    {id: 3, name: '🐔'},
    {id: 4, name: '🐰'},
    {id: 5, name: '🐸'},
    {id: 6, name: '🐵'},
  ]

  cards = signal<Product[]>([]);


  shuffleCards() {
    const duplicated = [...this.products, ...this.products];
    const shuffled = duplicated
    .map((card, index) => ({ ...card, id: index })) // assegna id unici
    .sort(() => Math.random() - 0.5);
    this.cards.set(shuffled);
  }

}
type Product = {
    id: number;
    name: string;
}
