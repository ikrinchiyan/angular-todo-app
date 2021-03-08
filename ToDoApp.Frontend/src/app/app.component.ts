import { Component } from '@angular/core';
import { TodoItem } from 'src/app/models/todo-item';
import { TodoItemService } from 'src/app/services/todo-item.service';
import { TodoItemsService } from 'src/app/services/todo-items.servce';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public items: TodoItem[] = [];
  public newItem: string;

  constructor(
    private _itemsSvc: TodoItemsService,
    private _todoItemSvc: TodoItemService
  ) {
  }

  ngOnInit(): void {
    this._itemsSvc.get().pipe(take(1))
      .subscribe((result)=>{
        this.items = result;  
    })
  }

  updateItem(item: TodoItem){
    this._todoItemSvc.update(item).pipe(take(1))
      .subscribe((result)=>{
        const index = this.items.findIndex((f) => f.id === result.id);
        this.items[index] = result;
    });   
  }

  deleteItem(item: TodoItem){
    this._todoItemSvc.delete(item.id).pipe(take(1))
      .subscribe((result)=>{
        const index = this.items.findIndex((f) => f === item);
        this.items.splice(index,1);
    });    
  }

  addNewItem(){
    if(!this.newItem.length){
      return;
    }

    const todoItem: TodoItem = { 
      id:0, 
      name: this.newItem, 
      isChecked: false 
    };

    this._itemsSvc.add(todoItem).pipe(take(1)).subscribe((result)=>{
      this.items.push(result);
      this.newItem = '';
    });
    
  }
  
}
