import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { State } from 'src/app/store/state.enum';

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
  width = 600;
  height = 400;

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
    let stateTaxPercentage = State[stax];
    this.stateTax = (salary - deduction) * (stateTaxPercentage / 100);

    let federTaxPercentage = this.employeeService.getFederalTaxPercentage(
      salary
    );
    this.federalTax = (salary - deduction) * (federTaxPercentage / 100);

    let takeHome = salary - deduction - (this.federalTax + this.stateTax);
    this.totalTakeHome = Math.round((takeHome + Number.EPSILON) * 100) / 100;
  }

  action(option: string) {
    if (option == 'list') this.router.navigate(['/list']);
    else this.router.navigate(['/edit/' + this.employeeId]);
  }
}
