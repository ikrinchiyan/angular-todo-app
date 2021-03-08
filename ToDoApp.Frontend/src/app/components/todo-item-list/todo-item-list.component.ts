import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/models/todo-item';


@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: ['./todo-item-list.component.scss']
})
export class TodoItemListComponent {

  @Input() items: TodoItem[] = [];

  @Output() itemDeleted = new EventEmitter<TodoItem>();
  @Output() itemEdited = new EventEmitter<TodoItem>();  

  constructor() { }

  deleteItem(item: TodoItem){
    this.itemDeleted.emit(item);
  }

  editItem(item: TodoItem){
    this.itemEdited.emit(item);
  }

}
