import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
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
  federalTaxAmount = 0;
  stateTaxAmount = 0;
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
            ['State Tax', this.stateTaxAmount],
            ['Federal Tax', this.federalTaxAmount]
          ];
        });
    });
  }

  calculate(salary: number, deduction: number, stax: string) {
    let stateTaxPercentage = this.employeeService.getStateTextPercentage(stax);
    this.stateTaxAmount = (salary - deduction) * (stateTaxPercentage / 100);

    let fedTaxPercentage = this.employeeService.getFederalTaxPercentage(salary);
    this.federalTaxAmount = (salary - deduction) * (fedTaxPercentage / 100);

    this.totalTakeHome = this.employeeService.getTakeHomeSalary(
      salary,
      deduction,
      fedTaxPercentage,
      stateTaxPercentage
    );
  }

  action(option: string) {
    if (option == 'list') this.router.navigate(['/employee/list']);
    else this.router.navigate(['/employee/edit/' + this.employeeId]);
  }
}
