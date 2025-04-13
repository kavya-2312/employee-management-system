import { Injectable } from '@angular/core';
import { AvatarService } from './avatar.service';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private avatarService: AvatarService) {
    this.assignAvatars()
  }
  private employees: Employee[] = [
    {
      id: 1,
      name: 'James Smith',
      company: 'Infosys Ltd',
      emailId: 'james.smith@infosys.com',
      contactNo: '9876543210',
      designation: 'Frontend Developer',
      avatar: ''
    },
    {
      id: 2,
      name: 'Bob Williams',
      company: 'Wipro',
      emailId: 'bob.william@wipro.com',
      contactNo: '9123456789',
      designation: 'Backend Developer',
      avatar: ''
    },
    {
      id: 3,
      name: 'Alice Johnson',
      company: 'Capgemini',
      emailId: 'alice.johnson@capgemini.com',
      contactNo: '9988776655',
      designation: 'Full Stack Developer',
      avatar: ''
    },
    {
      id: 4,
      name: 'Bobby Brown',
      company: 'TechMojo',
      emailId: 'bobby.brown@techmojo.com',
      contactNo: '9988776655',
      designation: 'Data Analyst',
      avatar: ''
    },
    {
      id: 5,
      name: 'Millie Thomson',
      company: 'Detect Solutions',
      emailId: 'millie.thomson@detect.com',
      contactNo: '9988776655',
      designation: 'Azure Developer',
      avatar: ''
    },
    {
      id: 6,
      name: 'Blake Robert',
      company: 'Photon Technologies',
      emailId: 'blake.robert@photon.com',
      contactNo: '9988776655',
      designation: 'SAP Analyst',
      avatar: ''
    }
  ];

  private assignAvatars() {
    this.employees = this.employees.map(employee => ({
      ...employee,
      avatar: this.avatarService.getAvatar(employee.name)
    }));
  }

  getEmployees(): Employee[] {
    return [...this.employees];
  }
}
