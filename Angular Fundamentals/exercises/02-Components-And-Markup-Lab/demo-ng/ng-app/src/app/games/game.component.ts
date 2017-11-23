import {Component} from '@angular/core';
import {Game} from "./game";

@Component({
  selector: 'app-game-component',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css']
})

export class GamesComponent {
  games: Game[];
  contentIsShown: boolean;
  buttonContent: string;
  imgUrl: string;
  isSpecial: boolean;

  constructor() {
    this.games = [
      new Game("Assassin's Creed", "Ubisoft", 199.99),
      new Game("Minecraft", "Mojang", 99.99),
      new Game("Battlefield", "EA", 229.99)
    ];
    this.contentIsShown = false;
    this.isSpecial = false;
    this.buttonContent = "Show Content";
    this.imgUrl = "https://psmedia.playstation.com/is/image/psmedia/ps2-hardware-two-column-01-ps4-eu-18nov15?$TwoColumn_Image$";
  }

  showContent(){
    this.contentIsShown = !this.contentIsShown;
    this.isSpecial = !this.isSpecial;
    this.buttonContent = this.buttonContent === "Show Content" ? "Hide Content" : "Show Content";
  }
}
