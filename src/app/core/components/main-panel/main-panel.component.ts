import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { CalculationsState } from '../../../state/baskets/calculations/calculations.state';
import { UserState } from '../../../state/user/user.state';
import { SecurityService } from '../../servers/security.service';
import { ProductDialogComponent } from '../../../modules/products/components/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsDialogComponent } from '../questions-dialog/questions-dialog.component';
import { AccessCounterService } from '../../helpers/access-counter.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {

  @Select(CalculationsState.isActive) isActive$!: Observable<boolean>;
  @Select(UserState.isAuthUser) isAuthUser$!: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private accessCounterService: AccessCounterService,
    private securityService: SecurityService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.accessCounterService
      .getTimer()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.openQuestionsDialog())

  }

  openQuestionsDialog(): void {
    this.securityService.getQuestions()
      .subscribe(questions => {
        this.dialog.open<QuestionsDialogComponent>(QuestionsDialogComponent, {
          data: {
            questions,
          },
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
