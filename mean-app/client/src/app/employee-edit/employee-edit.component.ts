import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee = {
    _id: '',
    name: '',
    position: '',
    department: '',
    salary: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(id).subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.error('Error fetching employee', error);
        }
      );
    }
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee._id, this.employee).subscribe(
      () => {
        this.router.navigate(['/employees']);
      },
      error => {
        console.error('Error updating employee', error);
      }
    );
  }
}
