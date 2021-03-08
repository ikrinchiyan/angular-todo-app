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
  export class TodoItemService extends ServiceBase {
    private _apiUrl = 'todoitem/';
  
    constructor(
      private readonly _http: HttpClient,
      private readonly _urlService: UrlService
    ) {
      super();
    }
   
    /**
     * @description Update todo item
     * @param item Todo item to update
     * @returns true if success
     */
    public update(item: TodoItem): Observable<TodoItem> {
      const url = this.getBaseUrl();

      return this._http.put<TodoItem>(url, item)
        .pipe(
          catchError((err) => this.handleError(err))
        );
    }

    /**
     * @description Delete todo item by id
     * @param id item id
     * @returns true if success
     */
    public delete(id: number): Observable<boolean> {
      const url = this.getBaseUrl() + `${id}`;

      return this._http.delete<boolean>(url)
        .pipe(
          catchError((err) => this.handleError(err))
        );
    }

    private getBaseUrl(): string{
      return this._urlService.getUrl(this._apiUrl);
    }

}