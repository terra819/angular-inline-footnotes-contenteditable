import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { TextBox } from './models/textBox';
import { Footnote } from './models/footnote';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  elements: TextBox[];
  footnotes: Footnote[];

  constructor(public appService: AppService) {
   appService.textBoxes.subscribe(elements => {
     this.elements = elements;
   });
   appService.foonotes.subscribe(footnotes => {
     this.footnotes = footnotes;
   });
   this.addTextBox();
  }

  addTextBox() {
    this.appService.addText();
  }
}
