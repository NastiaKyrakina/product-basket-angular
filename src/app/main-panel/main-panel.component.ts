import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { CalculationsState, ICalculationsState } from '../state/baskets/calculations/calculations.state';
import { UserState } from '../state/user/user.state';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent {

  @Select(CalculationsState.isActive) isActive$!: Observable<boolean>;
  @Select(UserState.isAuthUser) isAuthUser$!: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
