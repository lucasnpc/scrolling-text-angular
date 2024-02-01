import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  state: number = 0;

  textTwo = 'Donec libero erat, vehicula id ipsum ac, maximus ultricies velit. Cras et iaculis mi. Fusce sed purus non magna interdum facilisis quis eget turpis. Aenean vestibulum massa vel nisl faucibus lobortis';
  chars = this.textTwo.split('');
  displayText: string = '';

  underscoreRemoval = 300
  textReveal = 500

  constructor() {
    this.chars = this.textTwo.split('');
    this.autoReveal();
  }

  autoReveal() {
    let interval = setInterval(() => {
      if (this.state < this.chars.length) {
        this.displayText += this.chars[this.state] + '_';
        setTimeout(() => {
          this.displayText = this.displayText.slice(0, -1);
        }, this.underscoreRemoval);
        this.state += 1;
      } else {
        clearInterval(interval);
      }
    }, this.textReveal);
  }

  // getOpacity(index: number): number {
  //   return index < this.stateTwo ? 1 : 0;
  // }

  // getChar(index: number): string {
  //   return index === Math.floor(this.stateTwo) ? this.chars[index] + '_' : this.chars[index];
  // }

}
