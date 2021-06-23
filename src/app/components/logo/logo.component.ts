import { Component, OnInit } from '@angular/core';

import LogoLetter from './logo-letter.model';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  text = 'robin';
  letters: LogoLetter[] = [];
  private interval: any = null;
  private animateClass = 'hideshow';
  private letterClass = 'letter';

  constructor() {}

  ngOnInit() {
    const upperText = this.text.toUpperCase();
    this.letters = upperText.split('').map((text) => ({
      text,
      classes: this.letterClass
    }));

    this.cycleCharacters();
  }

  cycleCharacters() {
    clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      const letterIndex = this.letters.findIndex(
        (x) => x.classes.indexOf(this.animateClass) > -1
      );
      const nextLetterIndex =
        letterIndex + 1 < this.letters.length ? letterIndex + 1 : 0;
      if (letterIndex !== -1 && this.letters[letterIndex]) {
        this.letters[letterIndex].classes = this.letterClass;
      }
      const nextLetter = this.letters[nextLetterIndex];
      if (!nextLetter) {
        return;
      }
      nextLetter.classes = `${this.letterClass} ${this.animateClass}`;
    }, 3000);
  }
}
