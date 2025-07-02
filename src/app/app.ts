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
      <li *ngFor="let card of cards()" class="ms-card-item" (click)="flipCard(card)">
        <span *ngIf="card.flipped || card.matched; else hiddenCard">
          {{ card.name }}
        </span>
        <ng-template #hiddenCard>
          ❔
        </ng-template>
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
    {id: 1, name: '🐷', flipped: false, matched: false},
    {id: 2, name: '🐮', flipped: false, matched: false},
    {id: 3, name: '🐔', flipped: false, matched: false},
    {id: 4, name: '🐰', flipped: false, matched: false},
    {id: 5, name: '🐸', flipped: false, matched: false},
    {id: 6, name: '🐵', flipped: false, matched: false},
    {id: 7, name: '🐶', flipped: false, matched: false},
    {id: 8, name: '🐱', flipped: false, matched: false}
  ]

  cards = signal<Product[]>([]);


  shuffleCards() {
    const duplicated = [...this.products, ...this.products];
    const shuffled = duplicated
    .map((card, index) => ({ ...card, id: index }))
    .sort(() => Math.random() - 0.5);
    this.cards.set(shuffled);
  }

  flippedCards: Product[] = [];

  flipCard(card: Product) {
    if (card.flipped || card.matched || this.flippedCards.length === 2) {
      return;
    }

    card.flipped = true;
    this.flippedCards.push(card);
    this.cards.set([...this.cards()]);

    if (this.flippedCards.length === 2) {
      const [first, second] = this.flippedCards;

      if (first.name === second.name) {
        first.matched = second.matched = true;
        this.flippedCards = [];

        const allMatched = this.cards().every(card => card.matched);
        if (allMatched) {
          setTimeout(() => {
            alert('🎉 Hai trovato tutte le coppie!');
          }, 100);
       }
      } else {
        setTimeout(() => {
          first.flipped = second.flipped = false;
          this.flippedCards = [];
          this.cards.set([...this.cards()]);
        }, 700);
      }
    }
  }
}

type Product = {
    id: number;
    name: string;
    flipped: boolean;
    matched: boolean;
}
