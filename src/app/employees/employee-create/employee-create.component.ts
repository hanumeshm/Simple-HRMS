import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { State } from 'src/app/store/state.enum';

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
  maxDate: Date = new Date();
  isLinear = false;

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
    let stateTax = this.employeeService.getStateTaxPercentage(form.value.stax);
    let federalTax = this.employeeService.getFederalTaxPercentage(salary);

    let takeHome =
      salary -
      deduction -
      ((salary - deduction) * (federalTax + stateTax)) / 100;
    this.totalTakeHome = Math.round((takeHome + Number.EPSILON) * 100) / 100;
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}
