import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

import { GamesService } from './../../services/games.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe({ 
      next: (res: any) => {
        this.games = res.games;
      },
      error: (err) => console.log(err)
    });
  }

  deleteGame(id: number): void {
    this.gamesService.deleteGame(id)
    .subscribe({
      next: (res) => {
        this.getGames();
        console.log(res); 
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }
}
