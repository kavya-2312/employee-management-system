import { Component } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { AvatarService } from '../avatar.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isEditing = false;
  isViewing = false;
  isDeleting = false;
  constructor(private empService: EmployeeService, private avatarService: AvatarService) {

  }
  ngOnInit() {
    this.employees = this.empService.getEmployees();
  }
  onAdd() {
    this.selectedEmployee = null;
    this.isEditing = true;
  }

  onEdit(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.isEditing = true;
  }

  onView(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.isViewing = true;
    this.isEditing = false;
  }

  onSave(employee: Employee) {
    if (employee.id) {
      const index = this.employees.findIndex(e => e.id === employee.id);
      if (index > -1) this.employees[index] = employee;
    } else {
      employee.id = Date.now();
      employee.avatar = this.avatarService.getAvatar(employee.name);
      this.employees.push(employee);

    }
    this.isEditing = false;
  }

  onDelete(employee: Employee) {
    this.selectedEmployee = employee;
    this.isDeleting = true;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.selectedEmployee) {
      this.employees = this.employees.filter(e => e.id !== this.selectedEmployee?.id);
    }
    this.isDeleting = false;
    this.selectedEmployee = null;
  }
  onCancelView() {
    this.isViewing = false;
    this.selectedEmployee = null;
  }
}
