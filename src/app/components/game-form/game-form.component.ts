import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Game } from 'src/app/models/game';

import { GamesService } from './../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  }

  edit: boolean = false;

  constructor(private gamesService: GamesService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.gamesService.getGame(params['id'])
      .subscribe({
        next: (res) => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  saveNewGame(): void {
    delete this.game.id;
    delete this.game.created_at;
    this.gamesService.saveGame(this.game)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      error: (err) => console.log(err)
    });
  }

  updateGame(): void {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id, this.game)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
