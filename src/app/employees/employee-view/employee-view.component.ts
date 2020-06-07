import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  private employeeId: string;
  employee: Employee;
  isLoading = false;
  totalTakeHome = 0;
  federalTax = 0;
  stateTax = 0;
  title = 'Earnings/Deductions/Taxes';
  type = 'PieChart';
  data = null;
  options = {};
  width = 650;
  height = 400;
  is3D = true;

  constructor(
    public employeeService: EmployeesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.employeeId = paramMap.get('employeeId');
      this.isLoading = true;
      this.employeeService
        .getEmployee(this.employeeId)
        .subscribe(employeeData => {
          this.employee = employeeData.data;
          this.isLoading = false;
          this.calculate(
            this.employee.salary,
            this.employee.deduction,
            this.employee.stax
          );
          this.data = [
            ['Take Home', this.totalTakeHome],
            ['Pre Tax Deduction', this.employee.deduction],
            ['State Tax', this.stateTax],
            ['Federal Tax', this.federalTax]
          ];
        });
    });
  }

  calculate(salary: number, deduction: number, stax: string) {
    let stateTaxPercentage = 0;
    switch (stax) {
      case 'California': {
        stateTaxPercentage = 13;
        break;
      }
      case 'NY': {
        stateTaxPercentage = 12;
        break;
      }
      case 'Florida': {
        stateTaxPercentage = 0;
        break;
      }
      default: {
        stateTaxPercentage = 0;
        break;
      }
    }

    this.stateTax = (salary - deduction) * (stateTaxPercentage / 100);

    let federTaxPercentage = 0;
    switch (true) {
      case salary < 9700: {
        federTaxPercentage = 10;
        break;
      }
      case salary < 39475: {
        federTaxPercentage = 12;
        break;
      }
      case salary < 84200: {
        federTaxPercentage = 22;
        break;
      }
      case salary > 84200: {
        federTaxPercentage = 24;
        break;
      }
    }
    this.federalTax = (salary - deduction) * (federTaxPercentage / 100);

    let takeHome = salary - deduction - (this.federalTax + this.stateTax);
    this.totalTakeHome = Math.round((takeHome + Number.EPSILON) * 100) / 100;
  }

  action(option: string) {
    if (option == 'list') this.router.navigate(['/home']);
    else this.router.navigate(['/edit/' + this.employeeId]);
  }
}
