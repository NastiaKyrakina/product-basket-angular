import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuestion, SecurityService } from '../../servers/security.service';
import { ConfirmDialogComponent } from '../../../shared-modules/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngxs/store';
import { RefreshTokenAction } from '../../../state/user/user.actions';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.scss']
})
export class QuestionsDialogComponent implements OnInit {

  answersForm!: FormGroup;
  questions: IQuestion[] = [];
  requestError!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {questions: IQuestion[]},
    public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    private securityService: SecurityService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {
    this.questions = data.questions;
    this.createForm(data.questions);
    console.log(this.questions)
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

 createForm(questions: IQuestion[]): void {
    const answersArray = new FormArray([]);
      questions.forEach(question => answersArray.push(this.fb.group({
        question: [question.question, []],
        id: [question.id, []],
        answer: ['', [Validators.required]],
      })));
    this.answersForm = this.fb.group({
      answers: answersArray,
    });
   console.log(this.answersForm);
  }

  get answersFormArray(): FormArray {
    return this.answersForm.get('answers') as FormArray;
  }

  sendResult(): void {
    this.securityService.sendAnswers(this.answersForm.get('answers')?.value)
      .subscribe(
        () => {
          this.store.dispatch(new RefreshTokenAction());
          this.dialogRef.close();
        },
        () => {
          this.openCloseDialog();
        });
  }

  openCloseDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: {
        title: 'Некоретні відповіді',
        text: `Ідентичність не підтверджено. Буде виконано вихід із системи`,
        buttons: [
          {
            title: 'ОК',
            type: 'confirm',
          },
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
    });
  }
}
