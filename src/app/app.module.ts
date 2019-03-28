import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TextBoxComponent } from './components/textBox/textbox.component';
import { FootnoteComponent } from './components/footnote/footnote.component';

import { AppService } from './services/app.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TextBoxComponent, FootnoteComponent ],
  providers: [ AppService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
