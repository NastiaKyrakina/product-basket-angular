import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set<T>(key: string, value: T): void {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue);
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
}
