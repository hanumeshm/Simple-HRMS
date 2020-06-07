import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  private mode = 'create';
  private employeeId: string;
  employee: Employee;
  isLoading = false;
  totalTakeHome = 0;
  constructor(
    public employeeService: EmployeesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        this.employeeId = paramMap.get('employeeId');
        this.isLoading = true;
        this.employeeService
          .getEmployee(this.employeeId)
          .subscribe(employeeData => {
            this.employee = employeeData.data;
            this.isLoading = false;
          });
      } else {
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }

  onSaveEmployee(form: NgForm) {
    const employee: Employee = {
      id: null,
      fname: form.value.firstName,
      lname: form.value.lastName,
      dob: form.value.dateOfBirth,
      address: {
        street: form.value.street,
        apt: form.value.apt,
        city: form.value.city,
        state: form.value.state,
        country: form.value.country
      },
      salary: form.value.salary,
      deduction: form.value.deduction,
      stax: form.value.stax
    };
    this.isLoading = true;
    if (this.mode == 'create') {
      this.employeeService.addEmployee(employee);
    } else {
      employee.id = this.employeeId;
      this.employeeService.updateEmployee(this.employeeId, employee);
    }

    form.resetForm();
  }

  calculate(form: NgForm) {
    let salary = form.value.salary;
    let deduction = form.value.deduction;

    let stateTax = 0;
    switch (form.value.stax) {
      case 'California': {
        stateTax = 13;
        break;
      }
      case 'NY': {
        stateTax = 12;
        break;
      }
      case 'Florida': {
        stateTax = 0;
        break;
      }
      default: {
        stateTax = 0;
        break;
      }
    }

    let federalTax = 0;
    switch (true) {
      case salary < 9700: {
        federalTax = 10;
        break;
      }
      case salary < 39475: {
        federalTax = 12;
        break;
      }
      case salary < 84200: {
        federalTax = 22;
        break;
      }
      case salary > 84200: {
        federalTax = 24;
        break;
      }
    }

    let takeHome =
      salary -
      deduction -
      ((salary - deduction) * (federalTax + stateTax)) / 100;
    this.totalTakeHome = Math.round((takeHome + Number.EPSILON) * 100) / 100;
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
