import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditComponent } from './employee-edit.component';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
