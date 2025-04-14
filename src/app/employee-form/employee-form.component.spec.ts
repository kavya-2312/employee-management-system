import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { Employee } from '../employee.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    company: 'ABC Ltd',
    emailId: 'john@example.com',
    contactNo: '1234567890',
    designation: 'Developer',
    avatar: 'avatar1.png'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EmployeeFormComponent]
    });
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should patch form when employee input changes', () => {
    component.employee = mockEmployee;
    component.ngOnChanges();

    expect(component.employeeForm.value).toEqual(mockEmployee);
  });

  it('should emit save event if form is valid', () => {
    component.employeeForm.patchValue(mockEmployee);
    spyOn(component.save, 'emit');

    component.submitForm();

    expect(component.save.emit).toHaveBeenCalledWith(mockEmployee);
  });

  it('should mark all controls as touched if form is invalid', () => {
    component.employeeForm.patchValue({
      id: 0,
      name: '',
      company: '',
      emailId: '',
      contactNo: '',
      designation: '',
      avatar: ''
    });

    component.submitForm();

    const controls = component.employeeForm.controls;
    for (const key in controls) {
      expect(controls[key].touched).toBeTrue();
    }
  });
});
