import { IElement } from '../interfaces/IElement';

export class BaseElement implements IElement  {
  text: string;
  id: string;

  constructor() {
   this.id = this.newGuid();
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }
}