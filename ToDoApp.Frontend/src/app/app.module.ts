import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UrlService } from './services/uri.service';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoItemListComponent } from './components/todo-item-list/todo-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UrlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
