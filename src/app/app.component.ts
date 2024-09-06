import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fixed typo here
})
export class AppComponent {
  title = 'caguiat_dev';
}
