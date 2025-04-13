import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      company: ['', Validators.required],
      emailId: ['', [Validators.email, Validators.required]],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      designation: ['', Validators.required],
      avatar: ['']
    });
  }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    } 
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.save.emit(this.employeeForm.value);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
