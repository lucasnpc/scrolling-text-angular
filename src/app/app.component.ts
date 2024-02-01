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
  stateOne: number = 1;
  stateTwo: number = 0;

  textTwo = 'Donec libero erat, vehicula id ipsum ac, maximus ultricies velit. Cras et iaculis mi. Fusce sed purus non magna interdum facilisis quis eget turpis. Aenean vestibulum massa vel nisl faucibus lobortis';
  chars = this.textTwo.split('');

  onScroll(event: any) {
    let opacityOne = this.stateOne;
    let opacityTwo = this.stateTwo;

    if (event.deltaY > 0) {
      if (opacityOne > 0.5) {
        opacityOne -= 0.1;
      }
      opacityTwo += 0.1;
    } else {
      opacityOne += 1;
      opacityTwo -= 0.1;
    }
    if (opacityOne < 0.5) opacityOne = 0.5;
    if (opacityOne > 1) opacityOne = 1;

    if (opacityTwo < 0) opacityTwo = 0;
    if (opacityTwo > 1) opacityTwo = 1;

    this.stateOne = opacityOne;
    this.stateTwo = opacityTwo;
  }

  getOpacity(index: number): number {
    let scrollPosition = (this.stateTwo * this.chars.length) * 1.8;
    let opacity = (scrollPosition - index) / this.chars.length;
    if (opacity < 0) opacity = 0;
    return opacity;
  }
  
}
