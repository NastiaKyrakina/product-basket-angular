import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsFormComponent } from './restrictions-form.component';

describe('RestrictionsFormComponent', () => {
  let component: RestrictionsFormComponent;
  let fixture: ComponentFixture<RestrictionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestrictionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
