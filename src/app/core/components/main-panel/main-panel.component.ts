import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { CalculationsState } from '../../../state/baskets/calculations/calculations.state';
import { UserState } from '../../../state/user/user.state';
import { MatDialog } from '@angular/material/dialog';
import { Sex } from '../../../modules/calculations/models/calculations';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LocalStorageService } from '../../servers/local-storage.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {

  @Select(CalculationsState.isActive) isActive$!: Observable<boolean>;
  @Select(UserState.isAuthUser) isAuthUser$!: Observable<boolean>;

  isDarkTheme!: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private local: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.changeTheme(!!this.local.get('dark-theme'));
  }

  changeTheme(checked: boolean): void {
    const prevTheme = this.getPrevTheme();
    this.isDarkTheme = checked;

    const theme = this.getTheme();
    this.local.set('dark-theme', this.isDarkTheme);

    this.renderer.removeClass(document.body, prevTheme);
    this.renderer.addClass(document.body, theme);
  }

  getTheme(): string {
    return this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

  getPrevTheme(): string {
    return this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
