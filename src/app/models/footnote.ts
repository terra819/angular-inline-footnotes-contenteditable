import { BaseElement } from './baseElement';

const LOREM_IPSUM = `New Footnote`;

export class Footnote extends BaseElement {
  text: string;
  number: number;
  id: string;

  constructor(text = LOREM_IPSUM) {
    super();
    this.text = text;
    this.number = 1;
  }

  public getSuperscript() {
    return `<sup id="footnote_${this.id}" title="${this.text}">${this.number}</sup>`;
  }
}