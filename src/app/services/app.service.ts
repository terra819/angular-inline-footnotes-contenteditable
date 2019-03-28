import { Injectable } from '@angular/core';
import { TextBox } from '../models/textBox';
import { Footnote } from '../models/footnote';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  private _textBoxes = new BehaviorSubject<Array<TextBox>>(new Array<TextBox>());
  public textBoxes = this._textBoxes.asObservable();

  private _footnotes = new BehaviorSubject<Array<Footnote>>(new Array<Footnote>());
  public foonotes = this._footnotes.asObservable();

  addText() {
    this._textBoxes.value.push(new TextBox());
  }

  addFootnote(footnote: Footnote) {
    this._footnotes.value.push(footnote);
    this.assignNumbers();
  }

  deleteFootnote(footnote: Footnote) {
    const indexof = this._footnotes.value.findIndex(x => x.id === footnote.id);
    this._footnotes.value.splice(indexof, 1);
    this.assignNumbers();
  }

  assignNumbers() {
    const notes = new Array<Footnote>();
    const sups = this.getSuperscripts();

    for (let i = 0; i < sups.length; i++) {
      const footnote = this.getFootnoteFromSuperscript(sups[i]);
      footnote.number = i + 1;
      notes.push(footnote);
    }

    this._footnotes.next(notes);
    this.updateHtml();
  }

  getSuperscripts() {
    const sups = new Array<string>();
    this._textBoxes.value.forEach(textBox => {
      const localsups = this.getSuperscriptsFromText(textBox.text);
      localsups.forEach(sup => {
        sups.push(sup);
      });
    });
    return sups;
  }

  getSuperscriptsFromText(text: string) {
    const sups = new Array<string>();
    const matches = text.match(/<sup([\s\S]*?)<\/sup>/g);
    if (matches) {
      matches.forEach(match => {
        sups.push(match);
      });
    }
    return sups;
  }

  getFootnoteFromSuperscript(html: string) {
    const id = html.match(/"footnote_([\s\S]*?)"/g)[0].replace(/footnote_/, '').replace(/"/g, '');
    return this._footnotes.value.find(x => x.id === id);
  }

  updateHtml() {
    const footnotes: any[] = this._footnotes.value;
    footnotes.forEach(footnote => { footnote.matched = false; });

    const updateNeeded = false;
    this._textBoxes.value.forEach(textBox => {
      const sups = this.getSuperscriptsFromText(textBox.text);
      // loop through sups and replace with updated sups
      sups.forEach(sup => {
        const footNote = this.getFootnoteFromSuperscript(sup);
        if (footNote) {
          footnotes.find(x => x.id === footNote.id).matched = true;
          const newSup = footNote.getSuperscript();
          const newText = textBox.text.replace(sup, newSup);;
          textBox.text = newText;
        }
      });
    });
    footnotes.forEach(footnote => {
      if (!footnote.matched) {
        this.deleteFootnote(footnote);
      }
    });
  }
}