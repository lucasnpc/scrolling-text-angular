import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxPageScrollModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements AfterViewChecked {
  // Variables
  state = 0;
  paragraphIndex = 0;
  displayText = '';
  completedParagraphs: string[] = [];
  underscoreRemoval = 300;
  textReveal = 400;

  // Paragraphs
  paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    "Nunc pulvinar justo sit amet consequat convallis.",
    "Nam in purus iaculis, facilisis ipsum et, scelerisque turpis."
  ];

  words = this.paragraphs[this.paragraphIndex].split(/(\s+)/);

  // HTML Elements
  @ViewChildren('pElement') pElements!: QueryList<ElementRef>;

  constructor() {
    this.autoReveal();
  }

  ngAfterViewChecked() {
    this.scrollToLastParagraph();
  }

  autoReveal() {
    let interval = setInterval(() => {
      if (this.state < this.words.length) {
        this.addUnderscore()
        setTimeout(() => {
          this.removeUnderscore()
        }, this.underscoreRemoval);
        this.state += 1;
      } else {
        this.addCompletedParagraph()
        if (this.paragraphIndex < this.paragraphs.length) {
          this.startNextParagraph()
        } else {
          // All paragraphs are completed
          clearInterval(interval);
        }
      }
    }, this.textReveal);
  }

  scrollToLastParagraph(): void {
    try {
      this.pElements.last.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err) { }
  }

  addUnderscore() {
    this.displayText += this.words[this.state] + '_';
  }

  removeUnderscore() {
    this.displayText = this.displayText.slice(0, -1);
  }

  addCompletedParagraph() {
    this.completedParagraphs.push(this.displayText);
    this.displayText = '';
    this.paragraphIndex += 1;
  }

  startNextParagraph() {
    this.words = this.paragraphs[this.paragraphIndex].split(/(\s+)/);
    this.state = 0;
  }
}
