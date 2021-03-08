import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItem } from 'src/app/models/todo-item';

import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: `host-component`,
  template: `<app-todo-item [item]="item"></app-todo-item>`
})
class TestHostComponent {
  private item: TodoItem;

  constructor(){
    this.item = {id: 0, name: "todo-1", isChecked: false};
  }

  setInput(newItem: TodoItem) {
    this.item = newItem;
  }
}

describe('TodoItemComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    expect(hostFixture.nativeElement.querySelector('app-todo-item')).toBeTruthy();
  });
});
