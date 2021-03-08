import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UrlService } from "./uri.service";
import { Observable } from "rxjs";
import { TodoItem } from "../models/todo-item";
import { catchError } from "rxjs/operators";
import { ServiceBase } from "./service.base";

@Injectable({
    providedIn: 'root',
  })
  export class TodoItemsService extends ServiceBase {
    private _apiUrl = 'todoitems/';
  
    constructor(
      private readonly _http: HttpClient,
      private readonly _urlService: UrlService
    ) {
      super();
    }
    
    /**
     * @description Get all todo items
     * @returns a list of items
     */
    public get(): Observable<TodoItem[]> {
      const url = this.getBaseUrl();

      return this._http.get<TodoItem[]>(url)
        .pipe(
          catchError((err) => this.handleError(err))
        );
    }

    /**
     * @description Add new item to the list 
     * @param newItem Todo item to add to a list
     * @returns New item's id
     */
    public add(newItem: TodoItem): Observable<TodoItem> {
      const url = this.getBaseUrl();

      return this._http.post<TodoItem>(url, newItem)
        .pipe(
          catchError((err) => this.handleError(err))
        );
    }

    private getBaseUrl(): string{
      return this._urlService.getUrl(this._apiUrl);
    }

}
