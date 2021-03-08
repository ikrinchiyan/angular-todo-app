import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/models/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() item: TodoItem;

  @Output() itemDeleted = new EventEmitter<TodoItem>();
  @Output() itemEdited = new  EventEmitter<TodoItem>();

  public isEditMode = false;

  private oldName: string;

  constructor() { }

  deleteItem(item: TodoItem){
    this.itemDeleted.emit(item);
  }

  editItem(){
    this.oldName = this.item.name;    
    this.isEditMode = true;
  }

  saveEdit(){
    console.log(this.item.name);
    this.itemEdited.emit(this.item);

    this.endEditMode();    
  }

  cancelEdit(){
    this.item.name = this.oldName;
    this.endEditMode();
  }

  togleItemStatus(){
    this.itemEdited.emit(this.item);
  }

  private endEditMode(){
    this.isEditMode = false;
    this.oldName = ""
  }

}
