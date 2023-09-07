import { Injectable } from '@angular/core';
import { delay, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessCounterService {

  readonly MINUTES_DELAY = 3;

  tokenUpdateTimer$$: Subject<void> = new Subject();

  constructor() { }

  getTimer(): Observable<void> {
    return this.tokenUpdateTimer$$
      .asObservable()
      .pipe(
        delay(this.MINUTES_DELAY * 60 * 1000)
      )
  }

  updateTimer(): void {
    this.tokenUpdateTimer$$.next();
  }
}
