import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor() {}

  getUrl(endpoint: string) {
    return `${environment.apiUrl}/${endpoint}`;
  }
}
