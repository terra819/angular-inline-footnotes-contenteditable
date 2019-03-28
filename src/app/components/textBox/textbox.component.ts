import { Component, ElementRef, ViewChild, Input, DoCheck } from '@angular/core';
import { TextBox } from '../../models/textBox';
import { Footnote } from '../../models/footnote';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html'
})
export class TextBoxComponent {
  @ViewChild('textBox') textBox: ElementRef;
  @Input('element') textBoxElement: TextBox;

  constructor(public appService: AppService) {}

  ngDoCheck() {
    if (this.textBox.nativeElement.innerHTML !== this.textBoxElement.text) {
      this.textBox.nativeElement.innerHTML = this.textBoxElement.text;
    }
  }

  ngAfterViewInit() {
    this.textBox.nativeElement.innerHTML = this.textBoxElement.text;
  }

  updateElement() {
    this.textBoxElement.text = this.textBox.nativeElement.innerHTML;
    this.appService.updateHtml();
  }

  insertFootnote() {
    const newNote = new Footnote();
    document.execCommand('insertHTML', false, newNote.getSuperscript());
    this.updateElement();
    this.appService.addFootnote(newNote);
  }
}
