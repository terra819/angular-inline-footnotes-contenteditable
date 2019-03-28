import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Footnote } from '../../models/footnote';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-footnote',
  templateUrl: './footnote.component.html'
})
export class FootnoteComponent {
  @Input('element') footnoteElement: Footnote;
  @ViewChild('footNote') footNote: ElementRef;

  constructor(public appService: AppService) {}

  ngAfterViewInit() {
    this.footNote.nativeElement.innerHTML = this.footnoteElement.text;
  }

  updateElement() {
    this.footnoteElement.text = this.footNote.nativeElement.innerHTML;
    this.appService.updateHtml();
  }
}
