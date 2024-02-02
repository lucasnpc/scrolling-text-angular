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

  paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    "Nunc pulvinar justo sit amet consequat convallis.",
    "Nam in purus iaculis, facilisis ipsum et, scelerisque turpis."
  ];
  paragraphIndex: number = 0;
  chars = this.paragraphs[this.paragraphIndex].split(/(\s+)/)
  displayText: string = '';
  completedText: string = '';

  underscoreRemoval = 300
  textReveal = 400

  constructor() {
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
        this.completedText += this.displayText + '<br>';
        this.displayText = '';
        this.paragraphIndex += 1;
        if (this.paragraphIndex < this.paragraphs.length) {
          this.chars = this.paragraphs[this.paragraphIndex].split(/(\s+)/);
          this.state = 0;
        } else {
          clearInterval(interval);
        }
      }
    }, this.textReveal);
  }

}
