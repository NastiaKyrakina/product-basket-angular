import { Component, OnInit } from '@angular/core';
import { InitAuthState } from './state/user/user.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-basket';

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new InitAuthState())
  }
}
