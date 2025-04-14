import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { Employee } from '../employee.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeService } from '../employee.service';
import { AvatarService } from '../avatar.service';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  const mockEmployees: Employee[] = [
    { id: 1, name: 'Mary', company: 'DreamInfinity Ltd', emailId: 'Mary@dream.com', contactNo: '8866554567', designation: 'Data Engineer', avatar: 'avatar1' },
    { id: 2, name: 'Bobby', company: 'Tech Solutions', emailId: 'bobby@tech.com', contactNo: '8977554534', designation: 'Angular developer', avatar: 'avatar2' }
  ];


  beforeEach(() => {
    let avatarServiceSpy = jasmine.createSpyObj('AvatarService', ['getAvatar']);
    avatarServiceSpy.getAvatar.and.returnValue('random-avatar');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeListComponent],
      providers: [
        { provide: AvatarService, useValue: avatarServiceSpy },
        {
          provide: EmployeeService,
          useValue: {
            getEmployees: () => mockEmployees
          }
        }
      ],
    });
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isEditing to true on add', () => {
    component.onAdd();
    expect(component.isEditing).toBeTrue();
    expect(component.selectedEmployee).toBeNull();
  });

  it('should set isEditing to true and clone employee on edit', () => {
    const employee = mockEmployees[0];
    component.onEdit(employee);
    expect(component.isEditing).toBeTrue();
    expect(component.selectedEmployee).toEqual(employee);
    expect(component.selectedEmployee).not.toBe(employee);
  });

  it('should set isViewing to true and isEditing to false on view', () => {
    const employee = mockEmployees[0];
    component.onView(employee);
    expect(component.isViewing).toBeTrue();
    expect(component.isEditing).toBeFalse();
    expect(component.selectedEmployee).toEqual(employee);
  });

  it('should update existing employee on save', () => {
    const updatedEmployee = { ...mockEmployees[0], name: 'Mary Robert' };
    component.employees = [...mockEmployees];
    component.onSave(updatedEmployee);
    expect(component.employees[0].name).toBe('Mary Robert');
    expect(component.isEditing).toBeFalse();
  });

  it('should add a new employee on save', () => {
    const newEmployee: Employee = {
      id: 0,
      name: 'Charlie',
      company: 'Infosys',
      emailId: 'charlie@infosys.com',
      contactNo: '9876567434',
      designation: 'Product Analyst',
      avatar: ''
    };
    component.onSave(newEmployee);
    expect(component.employees.length).toBe(3);
    expect(component.employees[2].avatar).toBe('random-avatar');
    expect(component.isEditing).toBeFalse();
  });

  it('should prepare for delete on onDelete', () => {
    const employee = mockEmployees[1];
    component.onDelete(employee);
    expect(component.selectedEmployee).toEqual(employee);
    expect(component.isDeleting).toBeTrue();
  });

  it('should cancel view mode and reset selectedEmployee', () => {
    component.onView(mockEmployees[0]);
    component.onCancelView();
    expect(component.isViewing).toBeFalse();
    expect(component.selectedEmployee).toBeNull();
  });
});
