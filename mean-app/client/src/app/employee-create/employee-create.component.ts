import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  employee = {
    name: '',
    position: '',
    department: '',
    salary: 0
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.employeeService.createEmployee(this.employee).subscribe(
      () => {
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error creating employee', error);
      }
    );
  }
}
