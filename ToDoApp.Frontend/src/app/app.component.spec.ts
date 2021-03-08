import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoItem } from './models/todo-item';
import { TodoItemService } from './services/todo-item.service';
import { TodoItemsService } from './services/todo-items.servce';

const todoItems: TodoItem[] = [
  {id: 0, name: "todo-1", isChecked: false},
  {id: 1, name: "todo-2", isChecked: false},
  {id: 2, name: "todo-3", isChecked: false}
]

class TodoItemsServiceMock {
  public get(): Observable<TodoItem[]> {
    return of(todoItems);
  }

  public add(newItem: TodoItem): Observable<number> {
    return of(5);
  }    
}

class TodoItemServiceMock {
  public update(item: TodoItem): Observable<boolean> {
    return of(true);
  }

  public delete(id: number): Observable<boolean> {
    return of(true);
  }
}

describe('AppComponent', () => { 
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: TodoItemsService, useClass: TodoItemsServiceMock },
        { provide: TodoItemService, useClass: TodoItemServiceMock },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
